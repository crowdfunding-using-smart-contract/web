import { RiErrorWarningLine } from "react-icons/ri";

export default function PostNoCommentCard() {
	return (
		<div className="flex flex-col items-center justify-center">
			<RiErrorWarningLine size={64} className="text-gray-400" />
			<span className="text-gray-400">No comments here!</span>
		</div>
	);
}
