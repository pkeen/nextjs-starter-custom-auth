enum Roles {
	Admin = "admin",
	User = "user",
	Guest = "guest",
	// Add more roles as needed
}

const config = {
	jwtOptions: {
		algorithm: "HS256",
		// maxTokenAge: "1h", // thats on the verifyToken side
		expirationTime: "10 seconds",
	},
	cookies: {
		namePrefix: "wayward",
	},
	roles: Roles,
};

export default config;
export { Roles };
