const config = {
	jwtOptions: {
		algorithm: "HS256",
		// maxTokenAge: "1h", // thats on the verifyToken side
		expirationTime: "10 seconds",
	},
	cookies: {
		namePrefix: "wayward",
	},
};

export default config;
