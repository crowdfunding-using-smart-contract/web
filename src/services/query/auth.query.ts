import type { LoginPayload } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth.api";

export const useAuthLoginMutation = () =>
	useMutation({
		mutationKey: ["auth", "login"],
		mutationFn: async (params: LoginPayload) => {
			const res = await login(params);
			return res.result;
		},
	});
