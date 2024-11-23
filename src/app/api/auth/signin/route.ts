import { verifyPassword } from "@/utils/password";
import { validate } from "@/lib/auth/signin/validate";
import { findUserByEmail } from "@/lib/db/queries";
import { AuthResponse } from "@/lib/auth/utils";
import { signToken } from "@/lib/auth/utils/jwt";
import { generateCsrf } from "@/lib/auth/utils/csrf";

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
		const token = await signToken({ id: user.id, email: user.email });

		// Step 5: create a csrf token
		const csrf = generateCsrf();

		// Step 6: Create an AuthResponse with a cookie and csrf
		const res = AuthResponse.json(
			{ message: "Sign in successful" },
			{ status: 201 }
		);
		res.setCookie(token);
		res.setCsrf(csrf);
		return res;
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
