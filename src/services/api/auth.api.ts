import { api } from "@/libs/api";
import type { LoginPayload, LoginResponse, RegisterPayload, ResgisterResponse } from "@/types/auth";
import type { ResultResponse } from "@/types/response";

export async function login(params: LoginPayload): Promise<ResultResponse<LoginResponse>> {
	const { data } = await api.post("/api/auth/login", params);

	return data;
}

export async function register(params: RegisterPayload): Promise<ResultResponse<ResgisterResponse>> {
	const { data } = await api.post("/api/auth/register", params);

	return data;
}
