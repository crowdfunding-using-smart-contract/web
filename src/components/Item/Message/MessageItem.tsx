import dayjs from "dayjs";
import ProfileImage from "@/components/Image/ProfileImage";
import type { Message } from "@/types/channel";

type MessageItemProps = {
	message: Message;
	isOwnMessage: boolean;
};

export default function MessageItem({ message, isOwnMessage }: MessageItemProps) {
	if (isOwnMessage) {
		return (
			<div className="flex items-end justify-end mb-4 cursor-pointer">
				<span className="text-sm mr-2 text-gray-600">{dayjs(message.createdAt).fromNow()}</span>
				<div className="flex max-w-96 bg-indigo-600 text-white rounded-lg p-3 gap-3">
					<p>{message.text}</p>
				</div>
				<div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
					<ProfileImage
						src={message.author.profileImage}
						alt={message.author.displayName}
						firstLetter={message.author.displayName[0]}
						size={36}
					/>
				</div>
			</div>
		);
	}

	return (
		<div className="flex items-end mb-4 cursor-pointer">
			<div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
				<ProfileImage
					src={message.author.profileImage}
					alt={message.author.displayName}
					firstLetter={message.author.displayName[0]}
					size={36}
				/>
			</div>
			<div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
				<p className="text-gray-700">{message.text}</p>
			</div>
			<span className="text-sm ml-2 text-gray-600">{dayjs(message.createdAt).fromNow()}</span>
		</div>
	);
}
