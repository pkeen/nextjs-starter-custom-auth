import { AuthResponse } from "@/lib/auth/utils";

export async function POST() {
	// Destroy the session
	return AuthResponse.withCookie({
		cookie: "",
		json: { message: "Signed out successfully" },
		status: 200,
		cookieOptions: {
			maxAge: 0,
		},
	});
}
