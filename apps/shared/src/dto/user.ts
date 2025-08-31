import z from "zod";

export const zUser = z.object({
	id: z.string(),
	name: z.string().min(2).max(100),
	email: z.string().email(),
	emailVerified: z.boolean(),
	image: z.string().url().nullable().optional(),
	createdAt: z.date(),
	updatedAt: z.date(),
});
export type User = z.infer<typeof zUser>;
