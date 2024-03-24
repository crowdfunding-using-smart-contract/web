import { useMutation, useQuery } from "@tanstack/react-query";
import { CreatePostPayload, GetPostParams, Post } from "@/types/forum";
import { createPost, getPostById } from "../api/forum.api";

export const usePostQuery = (params: GetPostParams) =>
	useQuery<Post>({
		queryKey: ["forums", params.postId],
		queryFn: async () => {
			const res = await getPostById(params);
			return res.result;
		},
	});

export const useCreatePostMutation = () =>
	useMutation({
		mutationKey: ["post", "create"],
		mutationFn: async (payload: CreatePostPayload) => {
			const res = await createPost(payload);
			return res.result;
		},
	});
