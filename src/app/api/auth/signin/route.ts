import { verifyPassword } from "@/utils/password";
import { NextRequest, NextResponse } from "next/server";
import { validate } from "@/lib/auth/signin/validate";
import { findUserByEmail } from "@/lib/db/queries";
import { cookies } from "next/headers";
import { AuthResponse } from "@/lib/auth/utils";
import { signToken } from "@/lib/auth/utils/jwt";

export async function POST(req: Request) {
	try {
		// Step 1: Validate input
		const { email, password } = validate(await req.json());

		// Step 2: Find user by email
		const user = await findUserByEmail(email);
		if (!user) {
			throw new Error("User not found");
		}

		// Step 3: Verify password
		const isAuthenticated = await verifyPassword(password, user.password);
		if (!isAuthenticated) {
			// return NextResponse.json(
			// 	{ message: "Invalid credentials" },
			// 	{ status: 401 }
			// );
			throw new Error("Invalid credentials");
		}

		// Step 4: Sign JWT
		const token = signToken({ id: user.id, email: user.email });

		return AuthResponse.withCookie({
			cookie: token,
			json: { message: "User registered successfully" },
			status: 201,
		});
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "An error occurred";

		return AuthResponse.withCookie({
			cookie: "",
			json: { message: errorMessage },
			status: 500,
			cookieOptions: {
				maxAge: 0, // deletes old cookie
			},
		});
	}
}
