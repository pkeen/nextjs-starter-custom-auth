import db from "@/lib/db";
import { users } from "@/lib/db/schema";
import { verifyPassword } from "@/utils/password";
// import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { validate } from "@/lib/auth/signin/validate";
import { findUserByEmail } from "@/lib/db/queries";

export async function POST(req: Request) {
	try {
		// first validate the email and password with zod
		const { email, password } = validate(await req.json());
		console.log(email, password);
		// then find a user by email - see if exists
		const user = await findUserByEmail(email);
		if (!user) {
			throw new Error("User not found");
		}
		const isAuthenticated = await verifyPassword(password, user.password);
		// ^ this is maybe a problem as password can be null
		console.log(isAuthenticated);
		if (!isAuthenticated) {
			throw new Error("Invalid credentials");
		}
		return NextResponse.json(
			{ message: "Sign in successful" },
			{ status: 200 }
		);
	} catch (error) {
		console.error(error);

		let errorMessage = "An error occurred";
		if (error instanceof Error) {
			errorMessage = error.message;
		}

		return NextResponse.json({ message: errorMessage }, { status: 500 });
	}
}
