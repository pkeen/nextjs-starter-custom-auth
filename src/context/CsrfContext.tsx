"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const CsrfContext = createContext<string | null>(null);

export const useCsrfToken = () => useContext(CsrfContext);

export const CsrfProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [csrfToken, setCsrfToken] = useState<string | null>(null);

	useEffect(() => {
		// Fetch the CSRF token on app initialization
		async function fetchCsrfToken() {
			const response = await fetch("/api/auth/csrf");
			const data = await response.json();
			setCsrfToken(data.csrf);
		}

		fetchCsrfToken();
	}, []);

	return (
		<CsrfContext.Provider value={csrfToken}>
			{children}
		</CsrfContext.Provider>
	);
};
