import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import type { router } from "@your-app-name/backend/src/router";

const link = new RPCLink({
	url: `http://localhost:${process.env.BACKEND_PORT}`,
	fetch: (url, init) => {
		return fetch(url, {
			...init,
			credentials: "include",
		});
	},
});

export const client: RouterClient<typeof router> = createORPCClient(link);
export const orpc = createTanstackQueryUtils(client);
