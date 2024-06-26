import { api } from "@/libs/api";
import type {
	AuthenticateResponse,
	LoginPayload,
	RegisterPayload,
	RenewAccessTokenPayload,
	RenewAccessTokenResponse,
} from "@/types/auth";
import type { ResultResponse } from "@/types/response";

export async function login(params: LoginPayload): Promise<ResultResponse<AuthenticateResponse>> {
	const { data } = await api.post("/api/auth/login", params);

	return data;
}

export async function register(params: RegisterPayload): Promise<ResultResponse<AuthenticateResponse>> {
	const { data } = await api.post("/api/auth/register", params);

	return data;
}

export async function renewAccessToken(
	payload: RenewAccessTokenPayload,
): Promise<ResultResponse<RenewAccessTokenResponse>> {
	const { data } = await api.post("/api/auth/renew-token", payload);

	return data;
}

export async function sendVerifyEmail(params: { email: string }): Promise<ResultResponse<unknown>> {
	const { data } = await api.post("/api/auth/send-verify-email", params);

	return data;
}
