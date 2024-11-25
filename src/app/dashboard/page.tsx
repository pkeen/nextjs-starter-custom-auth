import React from "react";
import SignOutButton from "@/lib/components/SignOutButton";
import CsrfText from "@/lib/components/Testing/CsrfText";
import CsrfRequiredButton from "@/lib/components/Testing/CsrfRequiredButton";
import AccessTokenText from "@/lib/components/Testing/AccessTokenText";

const page = () => {
	return (
		<div>
			<h1>Dashboard</h1>
			<p>Not available to non-signed in users</p>
			<SignOutButton />
			<CsrfText />
			{/* <CsrfRequiredButton /> */}
			<AccessTokenText />
		</div>
	);
};

export default page;
