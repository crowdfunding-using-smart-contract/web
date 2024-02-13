import type { LoginPayload, RegisterPayload } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { login, register } from "../api/auth.api";

export const useAuthLoginMutation = () =>
	useMutation({
		mutationKey: ["auth", "login"],
		mutationFn: async (params: LoginPayload) => {
			const res = await login(params);
			return res.result;
		},
	});

export const useAuthRegisterMutation = () =>
	useMutation({
		mutationKey: ["auth", "register"],
		mutationFn: async (params: RegisterPayload) => {
			const res = await register(params);
			return res.result;
		},
	});
