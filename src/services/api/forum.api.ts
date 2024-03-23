import { api } from "@/libs/api";
import { GetPostParams, Post } from "@/types/forum";
import { ResultResponse } from "@/types/response";

export async function getPostById(params: GetPostParams): Promise<ResultResponse<Post>> {
	const { data } = await api.get(`/api/forums/${params.postId}`);

	return data;
}
