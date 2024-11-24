"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useCsrfToken } from "@/context/CsrfContext";

export default function SignOutButton() {
	const csrfToken = useCsrfToken();
	const router = useRouter();
	const handleClick = async () => {
		const response = await fetch("/api/auth/signout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			console.log("Sign out successful");
		} else {
			console.error("Sign out failed");
		}

		router.push("/auth/signin"); // redirect to signin page
	};

	return <button onClick={handleClick}>Sign Out</button>;
}
