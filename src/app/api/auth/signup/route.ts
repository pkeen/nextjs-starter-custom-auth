import { hashPassword } from "@/utils/password";
import { findUserByEmail, insertUserAndReturnIt } from "@/lib/db/queries";
import { validate } from "@/lib/auth/signup/validate";
import { signToken } from "@/lib/auth/utils/token/jwt";
import { AuthResponse } from "@/lib/auth/utils";

export async function POST(req: Request) {
	try {
		// Step 1: Validate input
		const { name, email, password } = validate(await req.json());

		// Step 2: Check if user already exists
		const existingUser = await findUserByEmail(email);
		if (existingUser) {
			throw new Error("An account with that email is already registered");
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
			console.error(err);
			throw new Error("Error inserting user");
		}

		// Step 5: Create Auth Token and Cookie
		// createAuthSession({ id: user.id, email: user.email });

		// Step 5: Sign a JWT for the new user
		const token = await signToken({ id: user.id, email: user.email });
		console.log("sign up route: token:", token);

		// // Step 6: Return a response with the JWT attached as cookie
		return AuthResponse.withCookie({
			cookie: token,
			json: { message: "User registered successfully" },
			status: 201,
		});
	} catch (err) {
		const errorMessage =
			err instanceof Error ? err.message : "An error occurred";

		return AuthResponse.withCookie({
			cookie: "",
			json: { message: errorMessage },
			status: 500,
			cookieOptions: {
				maxAge: 0,
			},
		});
	}
}
