import { useSocialLogin } from "@/hooks/useLogin";
import { capitalize } from "@/utils/string";
import type { SocialLoginDto } from "../../../../shared/src/dto/login";

export const SocialLogin = (data: SocialLoginDto) => {
	const { data: loginData } = useSocialLogin(data);
	const handleSubmit = () => {
		if (!loginData) {
			return;
		}
		console.log(loginData);
		const url = loginData.url;
		window.location.href = url!;
	};

	return (
		<div>
			<button type="submit" onClick={handleSubmit}>
				Login with {capitalize(data.provider)}
			</button>
		</div>
	);
};
