import { hashPassword } from "@/utils/password";
import { NextResponse } from "next/server";
import { findUserByEmail, insertUserAndReturnIt } from "@/lib/db/queries";
import { validate } from "@/lib/auth/signup/validate";
import { signToken } from "@/lib/auth/utils/jwt";
import { createAuthSession } from "@/lib/auth/utils";
import { AuthResponse } from "@/lib/auth/utils";

export async function POST(req: Request) {
	try {
		// Step 1: Validate input
		const { name, email, password } = validate(await req.json());

		// Step 2: Check if user already exists
		const existingUser = await findUserByEmail(email);
		if (existingUser) {
			return NextResponse.json(
				{ error: "An account with that email is already registered" },
				{ status: 400 }
			);
		}

		// Step 3: Hash the password
		const hashedPassword = await hashPassword(password);

		// Step 4: Insert the new user
		let user;
		try {
			user = await insertUserAndReturnIt({
				name,
				email,
				password: hashedPassword,
			});
		} catch (err) {
			throw new Error("Error inserting user");
		}

		// Step 5: Create Auth Token and Cookie
		// createAuthSession({ id: user.id, email: user.email });

		// Step 5: Sign a JWT for the new user
		const token = signToken({ id: user.id, email: user.email });

		// // Step 6: Set the token as an HTTP-only cookie
		return AuthResponse.withCookie(
			{ message: "User registered successfully" },
			token
		);

		// const response = new NextResponse(
		// 	JSON.stringify({
		// 		message: "User registered and logged in successfully",
		// 	}),
		// 	{ status: 201 }
		// );
		// response.cookies.set("auth-token", token, {
		// 	httpOnly: true,
		// 	secure: process.env.NODE_ENV === "production",
		// 	path: "/",
		// 	maxAge: 3600, // 1 hour
		// });

		// return response;

		return NextResponse.json(
			{ message: "User registered successfully" },
			{ status: 201 }
		);
	} catch (err) {
		console.error("Error during login:", err);

		const errorMessage =
			err instanceof Error ? err.message : "An error occurred";

		return NextResponse.json({ message: errorMessage }, { status: 500 });
	}
}
