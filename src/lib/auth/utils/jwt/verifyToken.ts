import jwt from "jsonwebtoken";

/**
 * Verifies a JWT and returns the decoded payload.
 * @param token - The JWT to verify.
 * @param options - Optional settings like algorithms to accept.
 * @returns The decoded payload.
 */
export function verifyToken(
	token: string,
	options: { algorithms?: jwt.Algorithm[] } = {}
): Record<string, any> {
	const secretOrPublicKey =
		options.algorithms && options.algorithms.includes("RS256")
			? process.env.JWT_PUBLIC_KEY // Asymmetric key
			: process.env.JWT_SECRET; // Symmetric key

	if (!secretOrPublicKey) {
		throw new Error(
			"Missing secret or public key for verifying the token."
		);
	}

	return jwt.verify(token, secretOrPublicKey, {
		algorithms: options.algorithms || ["HS256"], // Default to HS256
	}) as Record<string, any>;
}
