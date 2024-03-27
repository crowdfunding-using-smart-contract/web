import { useParams } from "react-router-dom";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import { useCreateCommentMutation, useCreateReplyMutation, usePostQuery } from "@/services/query/forum.query";
import { Button } from "@mantine/core";
import { HiReply } from "react-icons/hi";
import { RiErrorWarningLine } from "react-icons/ri";
import { Comment } from "@/types/forum";
import { useState } from "react";

export default function ForumDetailPage() {
	const { postId } = useParams();
	const { isLoading: fetchingPost, data: post, refetch: refetchPost } = usePostQuery({ postId: postId ? postId : "" });
	const { isPending: creatingComment, mutateAsync: createCommentAsync } = useCreateCommentMutation();
	const [comment, setComment] = useState("");

	const editor = useCreateBlockNote({
		initialContent: post ? JSON.parse(post.content) : "",
	});

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

	console.log(post);

	return (
		<div className="max-w-screen-lg mx-auto pt-32 px-4">
			<div className="flex flex-col items-center">
				<h1 className="text-[32px] text-[#222222] mb-3">{post.title}</h1>
				<p className="text-center text-xl text-[#BBBBBB]">{post.description}</p>
				<div className="w-full mt-8 border py-3">{post && <BlockNoteView editor={editor} editable={false} />}</div>
				<div className="w-full my-8 h-[1px] bg-gray-200 relative">
					<div className="absolute -bottom-[10px] left-8 bg-white px-3">
						<span className="text-sm text-gray-500">{post.comments.length} comments</span>
					</div>
				</div>
				<div className="w-full flex flex-col gap-y-4">
					{post.comments.length > 0 ? (
						post.comments.map((comment, index) => <PostComment comment={comment} key={index} />)
					) : (
						<NoComment />
					)}
				</div>
				<div className="w-full my-8 h-[1px] bg-gray-200 relative">
					<div className="absolute -bottom-[10px] left-8 bg-white px-3">
						<span className="text-sm text-gray-500">Leave a comment</span>
					</div>
				</div>
				<div className="w-full flex flex-col items-end mb-8">
					<textarea
						className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent duration-200"
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

function NoComment() {
	return (
		<div className="flex flex-col items-center justify-center">
			<RiErrorWarningLine size={64} className="text-gray-400" />
			<span className="text-gray-400">No comments here!</span>
		</div>
	);
}

function PostComment({ comment }: { comment: Comment }) {
	const [displayedComment, setDisplayedComment] = useState(comment);
	const [showCreateReply, setShowCreateReply] = useState(false);
	const [showReply, setShowReply] = useState(false);
	const [reply, setReply] = useState("");
	const { isPending: creatingReply, mutateAsync: createReplyAsync } = useCreateReplyMutation();

	async function handleCreateReply() {
		if (!displayedComment || reply === "") return;
		try {
			const res = await createReplyAsync({ commentId: comment.id, content: reply });
			setDisplayedComment({ ...displayedComment, replies: [...displayedComment.replies, res] });
		} catch (error) {
			console.error(error);
		} finally {
			setReply("");
		}
	}

	function handleShowReply() {
		setShowReply(true);
		setShowCreateReply(true);
	}

	return (
		<div className="flex flex-col">
			<div className="flex flex-col border p-3 rounded-md text-gray-700">
				<p className="whitespace-pre-wrap">{displayedComment.content}</p>
				<div className="flex items-center justify-between mt-5 px-2">
					<div className="flex items-center">
						<img
							src={displayedComment.author.profileImage}
							alt={displayedComment.author.fullName}
							className="w-8 h-8 rounded-full object-cover"
						/>
						<div className="flex flex-col ml-4">
							<span className="text-sm">{displayedComment.author.fullName}</span>
							<span className="text-xs text-gray-400">31 Minutes ago</span>
						</div>
					</div>
					<Button variant="subtle" color="gray" leftSection={<HiReply size={18} />} onClick={handleShowReply}>
						Reply
					</Button>
				</div>
			</div>
			{displayedComment.replies.length > 0 && (
				<Button
					variant="subtle"
					color="indigo"
					disabled={creatingReply}
					onClick={handleShowReply}
					className="w-max mx-auto mt-1"
					style={{
						display: showReply ? "none" : "block",
					}}
				>
					View replies ({displayedComment.replies.length})
				</Button>
			)}
			<div
				className="flex flex-col ml-8 border border-white border-l-gray-300 gap-y-3 pl-3"
				style={{
					marginTop: showReply || showCreateReply ? "1rem" : "0",
				}}
			>
				{showReply &&
					displayedComment.replies.map((r, idx) => (
						<div className="flex flex-col rounded-md border px-4 py-2" key={idx}>
							<p>{r.content}</p>
							<div className="flex mt-3">
								<img
									src={r.author.profileImage}
									alt={r.author.fullName}
									className="w-8 h-8 rounded-full object-cover"
								/>
								<div className="flex flex-col ml-4">
									<span className="text-sm">{r.author.fullName}</span>
									<span className="text-xs text-gray-400">31 Minutes ago</span>
								</div>
							</div>
						</div>
					))}
				{showCreateReply && (
					<div className="flex items-center gap-x-3">
						<input
							className="flex-1 px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent duration-200"
							placeholder="Write your reply here..."
							value={reply}
							onChange={(e) => setReply(e.target.value)}
						/>
						<Button variant="outline" color="indigo" disabled={creatingReply} onClick={handleCreateReply}>
							{creatingReply ? "Posting reply..." : "Post reply"}
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
