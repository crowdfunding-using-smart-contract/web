import { useMutation, useQuery } from "@tanstack/react-query";
import {
	CreateCommentPayload,
	CreatePostPayload,
	CreateReplyPayload,
	GetPostParams,
	ListPostsParams,
	Post,
} from "@/types/forum";
import { createComment, createPost, createReply, getPostById, listPosts } from "../api/forum.api";

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

export const useCreateCommentMutation = () =>
	useMutation({
		mutationKey: ["post", "comment"],
		mutationFn: async (payload: CreateCommentPayload) => {
			const res = await createComment(payload);
			return res.result;
		},
	});

export const useCreateReplyMutation = () =>
	useMutation({
		mutationKey: ["post", "reply"],
		mutationFn: async (payload: CreateReplyPayload) => {
			const res = await createReply(payload);
			return res.result;
		},
	});
