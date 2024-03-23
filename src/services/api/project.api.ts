import { api } from "@/libs/api";
import { parseToFormData } from "@/libs/formData";
import { CreateProjectPayload } from "@/types/project";

export async function createProject(payload: CreateProjectPayload) {
	const formData = parseToFormData<CreateProjectPayload>(payload);

	const { data } = await api.post("/api/projects", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return data;
}
