import { api } from "@/libs/api";
import { parseToFormData } from "@/libs/formData";
import { ResultResponse } from "@/types/response";
import { UpdateUserPayload, User } from "@/types/user";

export async function updateUserById(id: string, payload: UpdateUserPayload): Promise<ResultResponse<User>> {
	const formData = parseToFormData<UpdateUserPayload>(payload);
	const { data } = await api.patch(`/api/users/${id}`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return data;
}

export async function getCurrentUser(): Promise<ResultResponse<User>> {
	const { data } = await api.get("/api/users/me");

	return data;
}
