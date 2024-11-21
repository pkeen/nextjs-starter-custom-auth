import { NextResponse } from "next/server";

export class AuthResponse extends NextResponse {
	/**
	 * Sets a token as an HTTP-only cookie.
	 * @param token - The token to set.
	 * @param key? - Optional. The name of the cookie.
	 * @param options? - Cookie options.
	 */
	setCookie(
		token: string,
		key: string = "pk-auth-token",
		options: {
			httpOnly?: boolean;
			secure?: boolean;
			path?: string;
			maxAge?: number;
		} = {}
	) {
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
	 * @param json - The JSON data to include in the response.
	 * @param cookie - The token to set as a cookie.
	 * @param cookieKey - (Optional): The name of the cookie.
	 * @param cookieOptions - (Optional) Cookie options.
	 * @param init - Additional response options (status, headers, etc.).
	 * @returns An AuthResponse instance.
	 */
	static withCookie(
		json: Record<string, any>,
		cookie: string,
		cookieKey: string = "pk-auth-token",
		cookieOptions: {
			httpOnly?: boolean;
			secure?: boolean;
			path?: string;
			maxAge?: number;
		} = {},
		init: ResponseInit = { status: 200 }
	): AuthResponse {
		const response = new AuthResponse(JSON.stringify(json), init);
		response.setCookie(cookie, cookieKey, cookieOptions);
		return response;
	}
}
