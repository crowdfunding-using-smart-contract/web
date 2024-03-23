import { CreateProjectPayload } from "@/types/project";
import { useMutation } from "@tanstack/react-query";
import { createProject } from "../api/project.api";

export const useCreateProjectMutation = () =>
	useMutation({
		mutationKey: ["project", "create"],
		mutationFn: async (payload: CreateProjectPayload) => {
			const res = await createProject(payload);
			return res.result;
		},
	});
