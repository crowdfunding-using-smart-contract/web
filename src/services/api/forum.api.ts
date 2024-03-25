import { api } from "@/libs/api";
import { CreatePostPayload, GetPostParams, ListPostsParams, Post } from "@/types/forum";
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
