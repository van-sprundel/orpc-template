import { implement, ORPCError } from "@orpc/server";
import { routerContract } from "../../../shared/src/index.js";
import { auth } from "../auth.js";
import type { ORPCContext } from "../context.js";

const os = implement(routerContract).$context<ORPCContext>();

export const authRouter = {
	login: os.auth.login.handler(async ({ input }) => {
		try {
			const response = await auth.api.signInEmail({
				body: { email: input.email, password: input.password },
			});
			return response.user;
		} catch (e) {
			console.error(e);
			throw new ORPCError("UNAUTHORIZED", {
				message: e instanceof Error ? e.message : undefined,
			});
		}
	}),
	socialLogin: os.auth.socialLogin.handler(async ({ input }) => {
		try {
			const response = await auth.api.signInSocial({
				body: { provider: input.provider },
			});
			return response;
		} catch (e) {
			console.error(e);
			throw new ORPCError("UNAUTHORIZED", {
				message: e instanceof Error ? e.message : undefined,
			});
		}
	}),
	getSession: os.auth.getSession.handler(async ({ context }) => {
		try {
			const headers = context.reqHeaders ?? new Headers();
			const response = await auth.api.getSession({ headers });
			if (!response) {
				return null;
			}

			return { ...response?.session, user: response?.user };
		} catch (e) {
			console.error(e);
			throw new ORPCError("UNAUTHORIZED", {
				message: e instanceof Error ? e.message : undefined,
			});
		}
	}),
};
