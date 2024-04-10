import { CreateProjectFormValues, ListProjectParams, Project } from "@/types/project";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
	createProject,
	getOwnProjects,
	getProjectById,
	getRecommendationProjects,
	listProjects,
} from "../api/project.api";

export const useListProjectsQuery = (params: ListProjectParams) =>
	useQuery({
		queryKey: ["project", { params }],
		queryFn: async () => {
			const res = await listProjects(params);
			return res.result;
		},
	});

export const useCreateProjectMutation = () =>
	useMutation({
		mutationKey: ["project", "create"],
		mutationFn: async (payload: CreateProjectFormValues) => {
			const res = await createProject(payload);
			return res.result;
		},
	});

export const useGetProjectByIdQuery = (id?: string) =>
	useQuery<Project>({
		queryKey: ["project", id],
		queryFn: async () => {
			const res = await getProjectById(id);
			return res.result;
		},
	});

export const useGetOwnProjectsQuery = () =>
	useQuery<Project[]>({
		queryKey: ["project", "me"],
		queryFn: async () => {
			const res = await getOwnProjects();
			return res.result;
		},
	});

export const useGetRecommendationProjectsQuery = () =>
	useQuery<Project[]>({
		queryKey: ["project", "recommendation"],
		queryFn: async () => {
			const res = await getRecommendationProjects();
			return res.result;
		},
	});
