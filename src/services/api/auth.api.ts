import { api } from "@/libs/api";
import type { LoginPayload, LoginResponse } from "@/types/auth";
import type { ResultResponse } from "@/types/response";

export async function login(params: LoginPayload): Promise<ResultResponse<LoginResponse>> {
	const { data } = await api.post("/auth/login", params);

	return data;
}
