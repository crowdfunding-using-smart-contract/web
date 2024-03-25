export type User = {
	id: string;
	email: string;
	fullName: string;
	profileImage: string;
	birthdate: string;
	gender: string;
	isEmailVerified: boolean;
	createdAt: string;
	updatedAt: string;
};

export type UpdateUserPayload = {
	email?: string;
	profileImage?: File | null;
};
