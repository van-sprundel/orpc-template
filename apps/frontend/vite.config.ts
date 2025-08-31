import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const BACKEND_PORT = process.env.BACKEND_PORT ?? 3000;

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	define: {
		"process.env.BACKEND_PORT": JSON.stringify(BACKEND_PORT),
	},
	clearScreen: false,
	server: {
		proxy: {
			"/api": `http://localhost:${BACKEND_PORT}`,
		},
	},
});
