import { useEffect } from "react";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import { ChannelItem } from "@/components";
import useChatStore from "@/store/useChatStore";

export default function ChatBasePage() {
	const { roomId } = useParams<{ roomId: string }>();
	const navigate = useNavigate();
	const { channels, getChannelsAsync } = useChatStore();

	useEffect(() => {
		getChannelsAsync();
	}, [getChannelsAsync]);

	return (
		<div className="flex h-screen overflow-hidden pt-[70px]">
			<div className="w-1/4 bg-white border-r border-gray-300">
				<header className="p-4 border-b border-gray-300 flex justify-between items-center bg-primary text-white">
					<h1 className="text-2xl font-semibold">Chat</h1>
				</header>
				<div className="overflow-y-auto h-[calc(100vh-70px)] p-3 mb-9 pb-20">
					{channels.map((c) => (
						<ChannelItem
							key={c.receiver.id}
							active={roomId === c.receiver.id}
							channel={c}
							onClick={() => navigate(`/chat/${c.receiver.id}`)}
						/>
					))}
				</div>
			</div>

			<div className="flex-1 relative">
				<Outlet />
			</div>
		</div>
	);
}
