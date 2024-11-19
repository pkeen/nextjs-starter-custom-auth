"use server";
import { hashPassword, verifyPassword } from "@/utils/password";

let testUser = {
	id: "1",
	name: "Peter Keen",
	email: "pkeen7@gmail.com",
	password: "12345678",
};

interface credentials {
	email: string;
	password: string;
}

export const authorize = async (credentials: credentials) => {
	console.log("Authorize called with:", credentials?.email);
	const { email, password } = credentials || {};

	// first hash the test password
	testUser.password = await hashPassword(testUser.password);

	try {
		// verify user exist with given email
		const user = email === testUser.email ? testUser : null;
		if (!user) {
			throw new Error("No user found");
		}
		const isValid = await verifyPassword(password as string, user.password);
		if (!isValid) {
			throw new Error("Invalid password");
		}
		console.log("User logged in successfully");
		return user;
	} catch (error) {
		console.error("Error authorizing user, unkown error:", error);
		return null;
	}
};
