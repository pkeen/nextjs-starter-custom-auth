import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import { CsrfTokenProvider } from "@/context/AuthContext/CsrfTokenContext";
// import { AccessTokenProvider } from "@/context/AuthContext/AccessTokenContext";
import AuthProvider from "@/lib/auth/context/AuthContext/AuthProvider";
import Link from "next/link";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<AuthProvider>
					<Link href="/">Next Custom Auth</Link>-
					<Link href="/dashboard">Dashboard</Link>-
					<Link href="/auth/signin">Login</Link>
					{children}
				</AuthProvider>
			</body>
		</html>
	);
}
