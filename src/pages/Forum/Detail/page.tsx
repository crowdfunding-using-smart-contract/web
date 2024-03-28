import { useState } from "react";
import { useParams } from "react-router-dom";
import { Editor, PostCommentCard, PostNoCommentCard } from "@/components";
import { useCreateCommentMutation, usePostQuery } from "@/services/query/forum.query";
import { Button } from "@mantine/core";

export default function ForumDetailPage() {
	const { postId } = useParams();
	const { isLoading: fetchingPost, data: post, refetch: refetchPost } = usePostQuery({ postId: postId ? postId : "" });
	const { isPending: creatingComment, mutateAsync: createCommentAsync } = useCreateCommentMutation();
	const [comment, setComment] = useState("");

	if (fetchingPost) {
		return <div className="pt-32">Loading...</div>;
	}

	if (!post) {
		return <div className="pt-32">Post not found.</div>;
	}

	async function handleCreateComment() {
		if (!post || comment === "") return;
		try {
			await createCommentAsync({ postId: post.id, content: comment });
			refetchPost();
		} catch (error) {
			console.error(error);
		} finally {
			setComment("");
		}
	}

	return (
		<div className="max-w-screen-lg mx-auto pt-32 px-4">
			<div className="flex flex-col items-center">
				<h1 className="text-[32px] text-[#222222] mb-3">{post.title}</h1>
				<p className="text-center text-xl text-[#BBBBBB]">{post.description}</p>
				<div className="w-full border rounded-md my-3">
					<Editor data={post.content} disabled={true} />
				</div>
				<div className="w-full my-8 h-[1px] bg-gray-200 relative">
					<div className="absolute -bottom-[10px] left-8 bg-white px-3">
						<span className="text-sm text-gray-500">{post.comments.length} comments</span>
					</div>
				</div>
				<div className="w-full flex flex-col gap-y-4">
					{post.comments.length > 0 ? (
						post.comments.map((comment, index) => <PostCommentCard comment={comment} key={index} />)
					) : (
						<PostNoCommentCard />
					)}
				</div>
				<div className="w-full my-8 h-[1px] bg-gray-200 relative">
					<div className="absolute -bottom-[10px] left-8 bg-white px-3">
						<span className="text-sm text-gray-500">Leave a comment</span>
					</div>
				</div>
				<div className="w-full flex flex-col items-end mb-8">
					<textarea
						className="w-full p-3 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent duration-200"
						placeholder="Write your comment here..."
						rows={3}
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>
					<Button
						className="mt-3 w-max"
						variant="outline"
						color="indigo"
						disabled={creatingComment}
						onClick={handleCreateComment}
					>
						{creatingComment ? "Posting comment..." : "Post comment"}
					</Button>
				</div>
			</div>
		</div>
	);
}
