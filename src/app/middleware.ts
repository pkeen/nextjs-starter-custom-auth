import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request) {
	const token = request.cookies.get("pkAuth-token")?.value;

	if (!token) {
		return NextResponse.redirect(new URL("/login", request.url)); // Redirect to login if no token
	}

	try {
		const user = jwtVerify(token, process.env.JWT_SECRET); // Verify token
		// const user = jwt.verify(token, process.env.JWT_SECRET); // Verify token
		// request.nextUrl.searchParams.set("role", user.role); // Pass user info if needed
		return NextResponse.next(); // Allow access
	} catch (error) {
		return NextResponse.redirect(new URL("/login", request.url)); // Redirect on invalid token
	}
}

export const config = {
	matcher: ["/protected-page/:path*"], // Match specific routes
};
