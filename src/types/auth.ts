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

export type RegisterPayload = {
	email: string;
	firstname: string;
	lastname: string;
	phoneNumber: string;
	password: string;
	passwordConfirmation: string;
};

export type RegisterResponse = {
	id: string;
	email: string;
	fullName: string;
	phoneNumber: string;
	profileImage: string;
	createdAt: string;
	updatedAt: string;
};
