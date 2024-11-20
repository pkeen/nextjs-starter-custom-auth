import db from "../../db";
import { users, lower } from "../schema";
import { eq } from "drizzle-orm";

export const findUserByEmail = async (email: string) => {
	return await db
		.select()
		.from(users)
		.where(eq(lower(users.email), email.toLowerCase()));
};

export const insertUser = async (data: {
	name: string;
	email: string;
	password: string;
}) => {
	return await db.insert(users).values(data);
};
