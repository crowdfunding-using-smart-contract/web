import { ProjectCategory } from "@/types/projectCategory";
import { useQuery } from "@tanstack/react-query";
import { listProjectCategories } from "../api/projectCategory.api";

export const useListProjectCategoryQuery = () =>
	useQuery<ProjectCategory[]>({
		queryKey: ["project-categories"],
		queryFn: async () => {
			const res = await listProjectCategories();
			return res.result;
		},
	});
