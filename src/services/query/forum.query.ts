import { useQuery } from "@tanstack/react-query";
import { GetPostParams, Post } from "@/types/forum";
import { getPostById } from "../api/forum.api";

export const usePostQuery = (params: GetPostParams) =>
	useQuery<Post>({
		queryKey: ["forums", params.postId],
		queryFn: async () => {
			const res = await getPostById(params);
			return res.result;
		},
	});
