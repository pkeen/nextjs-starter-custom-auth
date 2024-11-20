import { hashPassword } from "@/utils/password";
import { NextResponse } from "next/server";
import { findUserByEmail, insertUser } from "@/lib/db/queries";

export async function POST(req: Request) {
	const { name, email, password } = await req.json();

	if (!email || !password || !name) {
		return NextResponse.json(
			{ error: "Email and password are required" },
			{ status: 400 }
		);
	}

	// Check if user already exists - returns array
	const existingUser = await findUserByEmail(email);

	if (existingUser.length > 0) {
		return NextResponse.json(
			{ error: "An account with that email is already registered" },
			{ status: 400 }
		);
	}

	// Hash the password
	const hashedPassword = await hashPassword(password);

	// Insert the new user
	await insertUser({
		name,
		email,
		password: hashedPassword,
	});

	return NextResponse.json(
		{ message: "User registered successfully" },
		{ status: 201 }
	);
}
