import { api } from "@/libs/api";
import { parseToFormData } from "@/libs/formData";
import {
	Post,
	Reply,
	Comment,
	ListPostsParams,
	GetPostParams,
	CreatePostPayload,
	CreateCommentPayload,
	CreateReplyPayload,
} from "@/types/forum";
import { PaginateResult } from "@/types/pagination";
import { ResultResponse } from "@/types/response";

export async function listPosts(params: ListPostsParams): Promise<ResultResponse<PaginateResult<Post>>> {
	const { data } = await api.get("/api/posts", { params });

	return data;
}

export async function getPostById(params: GetPostParams): Promise<ResultResponse<Post>> {
	const { data } = await api.get(`/api/posts/${params.postId}`);

	return data;
}

export async function createPost(payload: CreatePostPayload): Promise<ResultResponse<Post>> {
	const { data } = await api.post("/api/posts", payload);

	return data;
}

export async function createComment(payload: CreateCommentPayload): Promise<ResultResponse<Comment>> {
	const { data } = await api.post(`/api/posts/${payload.postId}/comments`, { content: payload.content });

	return data;
}

export async function createReply(payload: CreateReplyPayload): Promise<ResultResponse<Reply>> {
	const { data } = await api.post(`/api/comments/${payload.commentId}/replies`, { content: payload.content });

	return data;
}

export async function uploadPostImage(payload: { image: File }): Promise<{ success: number; file: { url: string } }> {
	const formData = parseToFormData<{ image: File }>(payload);

	const { data } = await api.post("/api/posts/upload", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return data;
}
