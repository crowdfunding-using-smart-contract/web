import { api } from "@/libs/api";
import { parseToFormData } from "@/libs/formData";
import { PaginateResult } from "@/types/pagination";
import { CreateProjectPayload, ListProjectParams, Project } from "@/types/project";
import { ResultResponse } from "@/types/response";

export async function listProjects(params: ListProjectParams): Promise<ResultResponse<PaginateResult<Project>>> {
	const { data } = await api.get("/api/projects", { params });

	return data;
}

export async function createProject(payload: CreateProjectPayload): Promise<ResultResponse<Project>> {
	const formData = parseToFormData<CreateProjectPayload>(payload);

	const { data } = await api.post("/api/projects", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return data;
}

export async function getProjectById(id?: string): Promise<ResultResponse<Project>> {
	const { data } = await api.get(`/api/projects/${id}`);

	return data;
}

export async function getOwnProjects(): Promise<ResultResponse<Project[]>> {
	const { data } = await api.get("/api/projects/me");

	return data;
}

export async function verifyProjectRating(projectId: string): Promise<ResultResponse<boolean>> {
	const { data } = await api.get(`/api/projects/${projectId}/ratings/verify`);

	return data;
}

export async function rateProject(projectId: string, rating: number): Promise<ResultResponse<boolean>> {
	const { data } = await api.post(`/api/projects/${projectId}/ratings`, { rating });

	return data;
}
