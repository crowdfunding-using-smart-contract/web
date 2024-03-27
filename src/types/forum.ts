import { Project } from "./project";
import { User } from "./user";

export type Post = {
	id: string;
	title: string;
	description: string;
	content: string;
	author: User;
	project: Project;
	comments: Comment[];
	createdAt: string;
};

export type Comment = {
	id: string;
	content: string;
	author: User;
	replies: Reply[];
	createdAt: string;
};

export type Reply = {
	id: string;
	content: string;
	author: User;
	createdAt: string;
};

// Secondary types
export type ListPostsParams = {
	page?: number;
	size?: number;
};

export type GetPostParams = {
	postId: string;
};

export type CreatePostPayload = {
	title: string;
	description: string;
	content: string;
	projectId: string;
};

export type CreateCommentPayload = {
	postId: string;
	content: string;
};

export type CreateReplyPayload = {
	commentId: string;
	content: string;
};
