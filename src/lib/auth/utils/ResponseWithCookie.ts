import { NextResponse } from "next/server";

export function ResponseWithCookie(
	data: Record<string, any>,
	token: string,
	cookieKey: string = "pk-auth-token",
	cookieOptions: {
		httpOnly?: boolean;
		secure?: boolean;
		path?: string;
		maxAge?: number;
	} = {},
	init: ResponseInit = { status: 200 }
): NextResponse {
	const response = NextResponse.json(data, init);
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
