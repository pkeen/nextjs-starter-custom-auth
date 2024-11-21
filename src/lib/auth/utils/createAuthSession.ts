import jwt from "jsonwebtoken";
import { signToken } from "./jwt";
import { setCookie } from "./cookie";

/**
 * Creates a JWT and sets it as an HTTP-only cookie.
 * @param payload - The payload to include in the JWT.
 * @param key - (Optional) The name of the cookie.
 * @param options - Optional settings for token creation and cookie attributes.
 */
export function createAuthSession(
	payload: Record<string, any>,
	key?: string,
	options: {
		secret?: string;
		expiresIn?: string | number; // JWT expiration time
		algorithm?: jwt.Algorithm;
		cookieOptions?: {
			httpOnly?: boolean;
			secure?: boolean;
			path?: string;
			maxAge?: number | string;
		};
	} = {}
): void {
	// Step 1: Create the JWT
	const token = signToken(payload, {
		expiresIn: options.expiresIn,
		algorithm: options.algorithm,
	});

	// Step 2: Set the JWT as an HTTP-only cookie
	setCookie(token, key, options.cookieOptions);
}
