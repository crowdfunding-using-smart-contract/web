import { User } from "./user";

export type LoginPayload = {
	email: string;
	password: string;
};

export type AuthenticateResponse = {
	sessionId: string;
	accessToken: string;
	accessTokenExpiredAt: string;
	refreshToken: string;
	refreshTokenExpiredAt: string;
	user: User;
};

export type RegisterPayload = {
	email: string;
	password: string;
	passwordConfirmation: string;
	firstname: string;
	lastname: string;
	birthdate: string;
	gender: string;
};

export interface ResgisterResponse extends User {}

export type RenewAccessTokenPayload = {
	refreshToken: string;
};

export type RenewAccessTokenResponse = {
	accessToken: string;
	accessTokenExpiredAt: string;
};
