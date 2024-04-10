import { api } from "@/libs/api";
import { parseToFormData } from "@/libs/formData";
import { PaginateResult } from "@/types/pagination";
import {
	CreateProjectFormValues,
	GetBackedProjectResponse,
	ListProjectParams,
	Project,
	UpdateProjectPayload,
} from "@/types/project";
import { ResultResponse } from "@/types/response";
import { crowdfundingContract, crowdfundingAbi, crowdfundingAddress } from "../../libs/web3";
import { Web3 } from "web3";

export async function listProjects(params: ListProjectParams): Promise<ResultResponse<PaginateResult<Project>>> {
	const { data } = await api.get("/api/projects", { params });

	const dataOnContract: bigint[] = await crowdfundingContract.methods.getAllProjects().call();
	console.log(dataOnContract);

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

export async function getRecommendationProjects(): Promise<ResultResponse<Project[]>> {
	const { data } = await api.get("/api/projects/recommendation");

	return data;
}

export async function createProject(payload: CreateProjectFormValues): Promise<ResultResponse<Project>> {
	if (!payload.endDate) {
		throw new Error("End date is required");
	}

	if (typeof window.ethereum === "undefined") {
		throw new Error("Ethereum wallet is not connected");
	}

	const web3 = new Web3(window.ethereum);
	await window.ethereum.enable();

	const accounts = await web3.eth.getAccounts();
	if (accounts.length === 0) throw new Error("No accounts found");

	const crowdfundingContractCreate = new web3.eth.Contract(crowdfundingAbi, crowdfundingAddress);

	const startDate = Math.floor(new Date().getTime() / 1000);
	const endDate = Math.floor(payload.endDate.getTime() / 1000);

	try {
		const transactionResponse = await crowdfundingContractCreate.methods
			.createProject(payload.title, web3.utils.toWei(payload.targetFunding.toString(), "ether"), startDate, endDate)
			.send({
				from: accounts[0],
			});

		console.log("Transaction response:", transactionResponse);

		const formData = parseToFormData({ ...payload, projectContractId: "1" });
		const { data } = await api.post("/api/projects", formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});

		return data;
	} catch (error) {
		console.error("Transaction error:", error);
		throw new Error("Failed to create project on the blockchain");
	}
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

export async function getBackedProjects(): Promise<ResultResponse<GetBackedProjectResponse[]>> {
	const { data } = await api.get("/api/projects/backed");

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

export async function contributeToProject(projectId: number, amount: number): Promise<void> {
	if (typeof window.ethereum === "undefined") {
		throw new Error("Ethereum wallet is not connected");
	}

	const web3 = new Web3(window.ethereum);
	const accounts = await web3.eth.getAccounts();

	if (accounts.length === 0) throw new Error("No accounts found");

	const contract = new web3.eth.Contract(crowdfundingAbi, crowdfundingAddress);

	const amountInWei = web3.utils.toWei(amount.toString(), "ether");

	try {
		await contract.methods.contribute(projectId, amountInWei).send({ from: accounts[0] });
		console.log("Contribution successful");
	} catch (error) {
		console.error("Contribution failed", error);
		throw error;
	}
}

// async function refundFromProject(projectId: number): Promise<void> {
// 	if (typeof window.ethereum === "undefined") {
// 		throw new Error("Ethereum wallet is not connected");
// 	}

// 	const web3 = new Web3(window.ethereum);
// 	const accounts = await web3.eth.getAccounts();

// 	if (accounts.length === 0) throw new Error("No accounts found");

// 	const contract = new web3.eth.Contract(crowdfundingAbi, crowdfundingAddress);

// 	try {
// 		await contract.methods.refund(projectId).send({ from: accounts[0] });
// 		console.log("Refund successful");
// 	} catch (error) {
// 		console.error("Refund failed", error);
// 		throw error;
// 	}
// }
