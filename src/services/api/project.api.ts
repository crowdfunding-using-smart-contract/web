import { api } from "@/libs/api";
import { parseToFormData } from "@/libs/formData";
import { PaginateResult } from "@/types/pagination";
import {
	CreateProjectFormValues,
	CreateProjectPayload,
	ListProjectParams,
	Project,
	UpdateProjectPayload,
} from "@/types/project";
import { ResultResponse } from "@/types/response";
import { crowdfundingContract, web3 } from "../../libs/web3";

export async function listProjects(params: ListProjectParams): Promise<ResultResponse<PaginateResult<Project>>> {
	const { data } = await api.get("/api/projects", { params });

	const dataOnContract: bigint[] = await crowdfundingContract.methods.getAllProjects().call();

	for (let i = 0; i < dataOnContract.length; i++) {
		const project_id = Number(dataOnContract[i]);
		const projectOnContract = await crowdfundingContract.methods.getProject(project_id).call();
		console.log(projectOnContract);
	}

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

export async function createProject(payload: CreateProjectFormValues): Promise<ResultResponse<Project>> {
	if (!payload.endDate) {
		throw new Error("End date is required");
	}

	const startDate = Math.floor(new Date().getTime() / 1000);
	const endDate = Math.floor(payload.endDate.getTime() / 1000);

	console.log("Address ID: ", payload.addressId);
	const res = await crowdfundingContract.methods
		.createProject(payload.title, web3.utils.toWei("1000", "ether"), startDate, endDate)
		.send({ from: payload.addressId });
	console.log("response from contract: ", res);

	const formData = parseToFormData<CreateProjectPayload>({ ...payload, projectContractId: "1" });

	const { data } = await api.post("/api/projects", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return data;
}

export async function updateProjectById(id: string, payload: UpdateProjectPayload): Promise<ResultResponse<Project>> {
	const formData = parseToFormData<UpdateProjectPayload>(payload);
	const { data } = await api.patch(`/api/projects/${id}`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return data;
}

export async function deleteProjectById(id: string): Promise<ResultResponse<boolean>> {
	const { data } = await api.delete(`/api/projects/${id}`);

	return data;
}

export async function contributeProject(id: string): Promise<ResultResponse<boolean>> {
	const { data } = await api.post(`/api/projects/${id}/contribute`);

	return data;
}

export async function refundProject(id: string): Promise<ResultResponse<boolean>> {
	const { data } = await api.post(`/api/projects/${id}/refund`);

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
