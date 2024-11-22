import { NextResponse } from "next/server";

export function nextWithCookie(
	token: string,
	cookieKey: string = "pk-auth-token",
	cookieOptions: {
		httpOnly?: boolean;
		secure?: boolean;
		path?: string;
		maxAge?: number;
	} = {}
): NextResponse {
	const response = NextResponse.next();
	const cookieOptionsWithDefaults = {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		path: "/",
		maxAge: 3600,
		...cookieOptions,
	};

	response.cookies.set(cookieKey, token, cookieOptionsWithDefaults);
	return response;
}
