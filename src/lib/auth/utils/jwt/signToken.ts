import jwt from "jsonwebtoken";
import { secret } from "./key";
import { SignJWT } from "jose";

/**
 * Signs a JWT with the given payload and options.
 * @param payload - The data to encode in the JWT.
 * @param options - Optional settings like algorithm and expiration.
 * @returns The signed JWT token.
 */

export const signToken = async (
	payload: Record<string, any>,
	options: { expiresIn?: string | number; algorithm?: jwt.Algorithm } = {}
): Promise<string> => {
	// const secretOrPrivateKey =
	// 	options.algorithm && options.algorithm.startsWith("RS")
	// 		? process.env.JWT_PRIVATE_KEY // Asymmetric key
	// 		: process.env.JWT_SECRET; // Symmetric key

	// if (!secretOrPrivateKey) {
	// 	throw new Error("Missing secret or private key for signing the token.");
	// }

	// return jwt.sign(payload, secretOrPrivateKey, {
	// 	algorithm: options.algorithm || "HS256", // Default to HS256
	// 	expiresIn: options.expiresIn || "1h",
	// });
	const jwt = await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setIssuer("urn:example:issuer")
		.setAudience("urn:example:audience")
		.setExpirationTime("2h")
		.sign(secret);

	return jwt;
};
