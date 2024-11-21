import { verifyPassword } from "@/utils/password";
import { NextRequest, NextResponse } from "next/server";
import { validate } from "@/lib/auth/signin/validate";
import { findUserByEmail } from "@/lib/db/queries";
import { signToken } from "@/lib/auth/utils/jwt";
import { cookies } from "next/headers";

export async function POST(req: Request) {
	try {
		// Step 1: Validate input
		const { email, password } = validate(await req.json());

		// Step 2: Find user by email
		const user = await findUserByEmail(email);
		if (!user) {
			return NextResponse.json(
				{ message: "User not found" },
				{ status: 404 }
			);
		}

		// Step 3: Verify password
		const isAuthenticated = await verifyPassword(password, user.password);
		if (!isAuthenticated) {
			return NextResponse.json(
				{ message: "Invalid credentials" },
				{ status: 401 }
			);
		}

		// Step 4: Sign JWT
		const jwt = await signToken({
			id: user.id,
			email: user.email,
			roles: user.roles || "user",
		});

		// Step 5: Set cookie
		cookies().set("pk-auth-session", jwt, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			path: "/",
			maxAge: 3600, // 1 hour
		});

		// Step 6: Respond with success
		return NextResponse.json(
			{ message: "Login successful" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error during login:", error);

		const errorMessage =
			error instanceof Error ? error.message : "An error occurred";

		return NextResponse.json({ message: errorMessage }, { status: 500 });
	}
}
