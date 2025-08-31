import z from "zod";

export const zSocialProvider = z.enum(["google"]);
export type SocialProvider = z.infer<typeof zSocialProvider>;

export const zSocialLogin = z.object({
	provider: zSocialProvider,
	callbackURL: z.url().optional(),
	errorCallbackURL: z.url().optional(),
});
export type SocialLoginDto = z.infer<typeof zSocialLogin>;

export const zLoginDto = z.object({
	email: z.string().email(),
	password: z.string().min(8).max(100),
});
export type LoginDto = z.infer<typeof zLoginDto>;
