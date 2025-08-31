import { createBrowserRouter, Navigate, redirect } from "react-router";
import { client } from "./lib/client";
import { DashboardPage } from "./pages/dashboard";
import { LoginPage } from "./pages/login";

const checkAuth = async () => {
	const session = await client.auth.getSession({});
	if (!session?.user) {
		throw redirect("/login");
	}
	return null;
};

export const router = createBrowserRouter([
	{
		path: "/",
		element: <DashboardPage />,
		loader: checkAuth,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "*",
		element: <Navigate to="/" replace />,
	},
]);
