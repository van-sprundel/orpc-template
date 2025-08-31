import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { getEnv } from "./util/env.js";

const prisma = new PrismaClient();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = getEnv([
	"GOOGLE_CLIENT_ID",
	"GOOGLE_CLIENT_SECRET",
]);

export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		google: {
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			redirectURI: "http://localhost:5173/api/auth/callback/google",
		},
	},
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
});
