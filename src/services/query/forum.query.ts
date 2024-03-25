import { useMutation, useQuery } from "@tanstack/react-query";
import { CreatePostPayload, GetPostParams, ListPostsParams, Post } from "@/types/forum";
import { createPost, getPostById, listPosts } from "../api/forum.api";

export const useListPostsQuery = (params: ListPostsParams) =>
	useQuery({
		queryKey: ["post", "list"],
		queryFn: async () => {
			const res = await listPosts(params);
			return res.result;
		},
	});

export const usePostQuery = (params: GetPostParams) =>
	useQuery<Post>({
		queryKey: ["post", params.postId],
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
