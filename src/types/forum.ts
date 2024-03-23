import { User } from "./user";

export type Post = {
	id: string;
	title: string;
	content: string;
	author: User;
	comments: Comment[];
	createdAt: string;
};

export type Comment = {
	id: string;
	content: string;
	replies: Reply[];
	createdAt: string;
};

export type Reply = {
	id: string;
	content: string;
	createdAt: string;
};

export type GetPostParams = {
	postId: string;
};
