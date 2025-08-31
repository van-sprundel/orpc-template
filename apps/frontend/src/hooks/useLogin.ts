import { useMutation, useQuery } from "@tanstack/react-query";
import { orpc } from "@/lib/client";
import type { SocialLoginDto } from "../../../shared/src/dto/login";

export const useLogin = () => useMutation(orpc.auth.login.mutationOptions({}));
export const useSocialLogin = (data: SocialLoginDto) =>
	useQuery(orpc.auth.socialLogin.queryOptions({ input: data }));
