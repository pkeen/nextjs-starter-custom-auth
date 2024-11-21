import { cookies } from "next/headers";

/**
 * Sets a token as an HTTP-only cookie.
 * @param token - The token to set.
 * @param key - (Optional) The name of the cookie.
 * @param options - (Optional) settings for the cookie.
 */
export const setCookie = (
	token: string,
	key: string = "pk-auth-token",
	options: {
		httpOnly?: boolean;
		secure?: boolean;
		path?: string;
		maxAge?: number;
	} = {}
): void => {
	const cookieStore = cookies();

	// Step 1: Set the cookie options
	const cookieOptions = {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		path: "/",
		maxAge: 3600, // Default to 1 hour
		...options, // Override defaults with user-provided options
	};

	// Step 2: Set the cookie
	cookieStore.set(key, token, cookieOptions);
};
