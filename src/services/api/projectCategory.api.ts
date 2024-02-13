import { api } from "@/libs/api";
import type { ResultResponse } from "@/types/response";
import type { ProjectCategory } from "@/types/projectCategory";

export async function listProjectCategories(): Promise<ResultResponse<ProjectCategory[]>> {
	const { data } = await api.get("/projects/categories");

	return data;
}
