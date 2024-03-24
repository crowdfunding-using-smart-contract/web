import { api } from "@/libs/api";
import { parseToFormData } from "@/libs/formData";
import { CreateProjectPayload, Project } from "@/types/project";
import { ResultResponse } from "@/types/response";

export async function createProject(payload: CreateProjectPayload): Promise<ResultResponse<Project>> {
	const formData = parseToFormData<CreateProjectPayload>(payload);

	const { data } = await api.post("/api/projects", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return data;
}

export async function getOwnProjects(): Promise<ResultResponse<Project[]>> {
	const { data } = await api.get("/api/projects/me");

	return data;
}
