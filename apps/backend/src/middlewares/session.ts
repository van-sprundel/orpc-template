import { ORPCError } from "@orpc/server";
import { auth } from "../auth.js";
import { base } from "../context.js";

export const sessionMiddleware = base.middleware(
	async ({ context, next, path }) => {
		if (path[0] === "auth") {
			return await next({ context });
		}
		const headers = context.reqHeaders ?? new Headers();
		const session = await auth.api.getSession({
			headers,
		});

		if (!session) {
			throw new ORPCError("UNAUTHORIZED", {
				message: "No active session found",
			});
		}

		return await next({ context: { session } });
	},
);
