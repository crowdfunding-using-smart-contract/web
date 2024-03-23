import { usePostQuery } from "@/services/query/forum.query";
import { useParams } from "react-router-dom";

export default function ForumDetailPage() {
	const { postId } = useParams();
	const { isPending, data } = usePostQuery({ postId: postId ? postId : "" });

	if (!postId || !data) {
		return null;
	}

	if (isPending) {
		return <div>Loading...</div>;
	}

	return (
		<div className="max-w-screen-lg mx-auto pt-32 px-4">
			<div className="flex flex-col items-center">
				<h1 className="text-[32px] text-[#222222] mb-3">{data.title}</h1>
				<p className="text-xl text-[#BBBBBB]">Make it easy for people to learn about your forum.</p>
				<span>{JSON.stringify(data)}</span>
			</div>
		</div>
	);
}
