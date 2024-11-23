import jwt from "jsonwebtoken";
import { secret } from "./key";

/**
 * Verifies a JWT and returns the decoded payload.
 * Using jsonwebtoken library not jose
 * @param token - The JWT to verify.
 * @param options - Optional settings like algorithms to accept.
 * @returns The decoded payload.
 */
export const verify = async (
	token: string,
	options: { algorithms?: jwt.Algorithm[] } = {}
) => {
	console.log("verify token function");
	console.log("token:", token);
	console.log("secret", secret);
	console.log("options:", options);
	// const isAsymmetric = options.algorithms?.includes("RS256");

	// const secretOrPublicKey = isAsymmetric
	// 	? process.env.JWT_PUBLIC_KEY // Asymmetric key
	// 	: secret; // Symmetric key

	// console.log("token:", token);
	// Step 1: Get the secret or public key to deternmine the algorithm
	// const secretOrPublicKey =
	// 	options.algorithms && options.algorithms.includes("RS256")
	// 		? process.env.JWT_PUBLIC_KEY // Asymmetric key
	// 		: process.env.JWT_SECRET; // Symmetric key

	// console.log("secretOrPublicKey:", secretOrPublicKey);

	// if (!secretOrPublicKey) {
	// 	throw new Error(
	// 		"Missing secret or public key for verifying the token."
	// 	);
	// }
	if (!process.env.JWT_SECRET) {
		throw new Error("Missing secret for verifying the token.");
	}

	const payload = jwt.verify(token, process.env.JWT_SECRET, options);

	// const payload = jwt.verify(token, secretOrPublicKey, {
	// 	algorithms: options.algorithms || ["HS256"], // Default to HS256
	// }) as Record<string, any>;

	// const payload = jwtVerify(token, secretOrPublicKey, {

	// const payload = jwt.verify(token, secretOrPublicKey, {
	// 	algorithms: options.algorithms || ["HS256"], // Default to HS256
	// });

	// console.log("payload:", payload);

	// return payload;
	return payload;
};
