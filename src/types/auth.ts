import { User } from "./user";

export type LoginPayload = {
	email: string;
	password: string;
};

export type LoginResponse = {
	sessionID: string;
	accessToken: string;
	accessTokenExpiredAt: string;
	refreshToken: string;
	refreshTokenExpiredAt: string;
	user: User;
};

export type RegisterPayload = {
	email: string;
	firstname: string;
	lastname: string;
	phoneNumber: string;
	password: string;
	passwordConfirmation: string;
};

export interface ResgisterResponse extends User {}
