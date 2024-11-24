import { AuthResponse } from "@/lib/auth/utils";

export async function POST() {
	const response = AuthResponse.withJson({ message: "Signed out" });
	// Destroy the auth token
	response.destroyCookie();
	response.destroyCsrf();
	return response;
}
