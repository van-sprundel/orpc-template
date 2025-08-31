import { createServer } from "node:http";
import { ORPCError, onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/node";
import { CORSPlugin, RequestHeadersPlugin } from "@orpc/server/plugins";
import { auth } from "./auth.js";
import { router } from "./router.js";

const PORT = Number(process.env.BACKEND_PORT) ?? 3000;

const handler = new RPCHandler(router, {
	plugins: [
		new CORSPlugin({
			credentials: true,
		}),
		new RequestHeadersPlugin(),
	],
	interceptors: [
		onError((error) => {
			if (error instanceof ORPCError) {
				return;
			}
			console.error(error);
		}),
	],
});

const server = createServer(async (req, res) => {
	const url = new URL(req.url!, `http://${req.headers.host}`);

	// handle better-auth callbacks
	if (url.pathname.startsWith("/api/auth/")) {
		const request = new Request(url.toString(), {
			method: req.method,
		});

		const response = await auth.handler(request);

		res.statusCode = response.status;
		response.headers.forEach((value, key) => {
			res.setHeader(key, value);
		});
		res.end(await response.text());
		return;
	}

	const result = await handler.handle(req, res);
	if (!result.matched) {
		res.statusCode = 404;
		res.end("No procedure matched");
	}
});

server.listen(PORT, "127.0.0.1", () =>
	console.log(`Listening on 127.0.0.1:${PORT}`),
);
