import { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { camelizeKeys, decamelizeKeys } from "humps";
import { getItem, setItem } from "./localStorage";
import { renewAccessToken } from "@/services/api/auth.api";
import { api } from "./api";

export interface ConsoleError {
	status: number;
	data: unknown;
}

export const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
	const accessToken = getItem("access_token");

	if (accessToken) {
		config.headers.set("Authorization", `Bearer ${accessToken}`);
	}

	config.params = decamelizeKeys(config.params);
	if (config.data instanceof FormData) {
		config.headers.set("Content-Type", "multipart/form-data");
	} else if (config.data) {
		config.data = decamelizeKeys(config.data);
	}

	return config;
};

export const successInterceptor = (response: AxiosResponse): AxiosResponse => {
	if (response.data && response.headers["content-type"].includes("application/json")) {
		response.data = camelizeKeys(response.data);
	}

	return response;
};

export const errorInterceptor = async (error: AxiosError): Promise<void> => {
	const originalRequest = error.config;
	if (!originalRequest) {
		return await Promise.reject(error);
	}

	if (error.response?.status === 401) {
		const refreshToken = getItem("refresh_token") as string;
		if (!refreshToken) {
			return await Promise.reject(error);
		}

		try {
			const res = await renewAccessToken({ refreshToken });
			setItem("access_token", res.result.accessToken);
			setItem("access_token_expired_at", res.result.accessTokenExpiredAt);

			originalRequest.headers.Authorization = `Bearer ${res.result.accessToken}`;

			return api.request(originalRequest);
		} catch (error) {
			return await Promise.reject(error);
		}
	} else {
		if (error.response) {
			const errorMessage: ConsoleError = {
				status: error.response.status,
				data: error.response.data,
			};
			console.error(errorMessage);
		} else if (error.request) {
			console.error(error.request);
		} else {
			console.error("Error", error.message);
		}
		await Promise.reject(error);
	}
};
