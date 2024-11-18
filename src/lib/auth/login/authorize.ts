"use server";

const testUser = {
	email: "pkeen7@gmail.com",
	password: "12345678",
};

interface credentials {
    email: string;
    password: string;
};

export const authorize = async (credentials: credentials) => {
    console.log("Authorize called with:", credentials?.email);

	const { email, password } = credentials || {};

	console.log("password: ", password);

	if (email === testUser.email) {
		console.log("email matches");
	}

	if (password === testUser.password) {
		console.log("password matches");
	}

	const user =
		email === testUser.email && password === testUser.password
			? testUser
			: null;

	return user;

}