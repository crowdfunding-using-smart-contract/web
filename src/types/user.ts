export type User = {
	id: string;
	email: string;
	displayName: string;
	fullName: string;
	profileImage: string;
	birthdate: string;
	gender: string;
	metamaskAccountId: string;
	isEmailVerified: boolean;
	createdAt: string;
	updatedAt: string;
};

export type UpdateUserPayload = {
	displayName?: string;
	email?: string;
	profileImage?: File | null;
	metamaskAccountId?: string | null;
};
