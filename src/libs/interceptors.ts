import { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { camelizeKeys, decamelizeKeys } from "humps";
import { getItem } from "./localStorage";

export interface ConsoleError {
	status: number;
	data: unknown;
}

export const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
	const token = getItem<string>("token");
	if (token) {
		config.headers.set("Authorization", `Bearer ${token}`);
	}

	config.params = decamelizeKeys(config.params);
	config.data = decamelizeKeys(config.data);

	return config;
};

export const successInterceptor = (response: AxiosResponse): AxiosResponse => {
	if (response.data && response.headers["content-type"].includes("application/json")) {
		response.data = camelizeKeys(response.data);
	}

	return response;
};

export const errorInterceptor = async (error: AxiosError): Promise<void> => {
	if (error.response?.status === 401) {
		await Promise.reject(error);
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
