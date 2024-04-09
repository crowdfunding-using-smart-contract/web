import dayjs from "dayjs";
import ProfileImage from "@/components/Image/ProfileImage";
import type { GetOwnChannelsResponse } from "@/types/channel";

type ChannelItemProps = {
	active: boolean;
	channel: GetOwnChannelsResponse[number];
	onClick: () => void;
};

export default function ChannelItem({ active, channel, onClick }: ChannelItemProps) {
	return (
		<div
			className="flex mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
			style={{
				backgroundColor: active ? "#f6f6f6" : "transparent",
			}}
			onClick={onClick}
		>
			<div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
				<ProfileImage
					src={channel.receiver.profileImage}
					alt={channel.receiver.displayName}
					size={48}
					firstLetter={channel.receiver.displayName[0]}
				/>
			</div>
			<div className="flex-1">
				<h2 className="text-lg line-clamp-1">{channel.receiver.displayName}</h2>
				<p className="text-gray-600 line-clamp-1">{channel.lastMessage?.text}</p>
			</div>
			<span className="text-xs text-gray-400 mt-1.5">{dayjs(channel.lastMessage?.createdAt).fromNow()}</span>
		</div>
	);
}
