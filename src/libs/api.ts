import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { errorInterceptor, requestInterceptor, successInterceptor } from "./interceptors";
import getEnv from "./env";

const axiosRequestConfig: AxiosRequestConfig = {
	baseURL: getEnv("VITE_API_ENDPOINT"),
	responseType: "json",
	headers: {
		"Content-Type": "application/json",
	},
};

const api: AxiosInstance = axios.create(axiosRequestConfig);

api.interceptors.request.use(requestInterceptor);
api.interceptors.response.use(successInterceptor, errorInterceptor);

export { api };
