import db from "../../db";
import { users, lower } from "../schema";
import { eq } from "drizzle-orm";

export const findUserByEmail = async (email: string) => {
	const user = await db
		.select()
		.from(users)
		.where(eq(lower(users.email), email.toLowerCase()));
	return user[0];
};

export const insertUser = async (data: {
	name: string;
	email: string;
	password: string;
}) => {
	return await db.insert(users).values(data);
};
