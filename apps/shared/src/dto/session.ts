import z from "zod";
import { zUser } from "./user.js";

export const zSession = z.object({
	id: z.string(),
	token: z.string(),
	expiresAt: z.coerce.date(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
	ipAddress: z.string().nullable().optional(),
	userAgent: z.string().nullable().optional(),
	user: zUser.optional(),
});
