import { useState } from "react";
import dayjs from "dayjs";
import { Button } from "@mantine/core";
import { HiReply } from "react-icons/hi";
import { useCreateReplyMutation } from "@/services/query/forum.query";
import type { Comment } from "@/types/forum";

type PostCommentCardProps = {
	comment: Comment;
};

export default function PostCommentCard({ comment }: PostCommentCardProps) {
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
							<span className="text-xs text-gray-400">{dayjs(displayedComment.createdAt).fromNow()}</span>
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
									<span className="text-xs text-gray-400">{dayjs(r.createdAt).fromNow()}</span>
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
