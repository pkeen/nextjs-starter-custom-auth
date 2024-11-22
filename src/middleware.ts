import { NextRequest, NextResponse } from "next/server";
import { AuthResponse } from "./lib/auth/utils";
import { verifyToken, verifyAndRefresh } from "@/lib/auth/utils/jwt";

export function middleware(request: NextRequest) {
	const token = request.cookies.get("pk-auth-token")?.value;
	// Log middleware activity
	console.log("Middleware running on:", request.nextUrl.pathname);

	if (!token) {
		console.log("No token found, redirecting to /signin");
		return NextResponse.redirect(new URL("/signin", request.url));
	}

	return verifyAndRefresh(token)
		.then((newToken) => {
			console.log("newToken:", newToken);
			const response = AuthResponse.next();
			response.setCookie(newToken);
			return response;
		})
		.catch((error) => {
			console.error("error:", error);
			return NextResponse.redirect(new URL("/signin", request.url));
		}); // Redirect to login if token is invalid

	// return verifyToken(token)
	// 	.then((payload) => {
	// 		console.log("payload:", payload);
	// 		return NextResponse.next(); // allow the request to continue
	// 	})
	// 	.catch((error) => {
	// 		console.error("error:", error);
	// 		return NextResponse.redirect(new URL("/signin", request.url)); // Redirect to login if token is invalid
	// 	});
}

export const config = {
	// matcher: ["/protected-page/:path*"], // Match specific routes
	/*
	 * Match all routes by default, except the following:
	 * - Public pages: `/signin`
	 * - API routes: `/api/public/:path*`
	 */
	matcher: ["/((?!_next|static|signin|api/auth|signup|public).*)"], // Protect all except these patterns
};
