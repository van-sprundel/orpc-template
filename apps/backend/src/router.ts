import { os } from "@orpc/server";
import { sessionMiddleware } from "./middlewares/session.js";
import { authRouter } from "./routes/auth.js";

export const router = os.use(sessionMiddleware).router({
	auth: authRouter,
});
