import { useState } from "react";
import { useNavigate } from "react-router";
import { SocialLogin } from "@/components/auth/social-login";
import { useLogin } from "@/hooks/useLogin";
import type { LoginDto } from "../../../shared/src/dto/login";

export const LoginPage = () => {
	const navigate = useNavigate();
	const [data, setData] = useState<LoginDto>({
		email: "",
		password: "",
	});
	const loginMutation = useLogin();

	const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		await loginMutation.mutateAsync(data);

		try {
			navigate("/");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<SocialLogin
				provider="google"
				callbackURL={window.location.origin}
				errorCallbackURL={window.location.origin}
			/>
			<form onSubmit={handleEmailSubmit}>
				<label>
					Email:
					<input
						type="email"
						value={data.email}
						onChange={(e) => setData({ ...data, email: e.target.value })}
					/>
				</label>
				<label>
					Password:
					<input
						type="password"
						value={data.password}
						onChange={(e) => setData({ ...data, password: e.target.value })}
					/>
				</label>
				<button type="submit">Login</button>
			</form>
		</>
	);
};
