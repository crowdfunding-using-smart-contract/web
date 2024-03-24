import { CreateProjectPayload, Project } from "@/types/project";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createProject, getOwnProjects } from "../api/project.api";

export const useCreateProjectMutation = () =>
	useMutation({
		mutationKey: ["project", "create"],
		mutationFn: async (payload: CreateProjectPayload) => {
			const res = await createProject(payload);
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
