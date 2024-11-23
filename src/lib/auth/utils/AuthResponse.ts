import { NextResponse } from "next/server";
import config from "../config";

export class AuthResponse extends NextResponse {
	/**
	 * Sets a token as an HTTP-only cookie.
	 * @param token - The token to set.
	 * @param key? - Optional. The name of the cookie.
	 * @param options? - Optional Cookie options.
	 */
	setCookie(
		token: string,
		key: string = `${config.cookies.namePrefix}-token`,
		options: {
			httpOnly?: boolean;
			secure?: boolean;
			path?: string;
			maxAge?: number;
		} = {}
	): void {
		const cookieOptions = {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			path: "/",
			maxAge: 3600,
			...options,
		};

		this.cookies.set(key, token, cookieOptions);
	}

	/**
	 * Creates a new ExtendedResponse with JSON data and sets a cookie.
	 * @param options - The options for creating the response.
	 * @returns An AuthResponse instance.
	 */
	static withCookie({
		cookie,
		json,
		cookieKey,
		status = 200,
		cookieOptions,
	}: {
		cookie: string;
		json?: Record<string, any>;
		cookieKey?: string;
		status?: number;
		cookieOptions?: {
			httpOnly?: boolean;
			secure?: boolean;
			path?: string;
			maxAge?: number;
		};
	}): AuthResponse {
		const response = new AuthResponse(JSON.stringify(json), { status });
		response.setCookie(cookie, cookieKey, cookieOptions);
		return response;
	}
	/**
	 * Creates an instance of NextResponse.next() as AuthResponse.
	 * @returns An AuthResponse instance.
	 */
	static next(): AuthResponse {
		const response = NextResponse.next(); // Get the original `NextResponse.next()`
		return Object.assign(new AuthResponse(), response); // Merge with `AuthResponse`
	}
}
