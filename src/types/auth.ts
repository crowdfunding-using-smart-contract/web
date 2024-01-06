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
	user: unknown;
};
