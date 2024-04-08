import { Fragment, useEffect, useState } from "react";
import useAuthStore from "@/store/useAuthStore";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { renewAccessToken } from "@/services/api/auth.api";
import { getOrCreateChannel, getOwnChannels, sendMessage } from "@/services/api/channel";
import { GetOwnChannelsResponse, Message, RecieveMessage } from "@/types/channel";
import { getCookie, setCookie } from "@/libs/cookie";
import { User } from "@/types/user";
import { ProfileImage } from "@/components";
import dayjs from "dayjs";
import { camelizeKeys } from "humps";
import { Formik } from "formik";

export default function NewChatPage() {
	const { user } = useAuthStore();
	const [channels, setChannels] = useState<GetOwnChannelsResponse>([]);
	const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
	const [selectedReceiver, setSelectedReceiver] = useState<User | null>(null);
	const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
	const webSocketUrl = `ws://localhost:3000/ws?token=${getCookie("access_token")}`;
	const { readyState, sendJsonMessage, lastMessage } = useWebSocket(webSocketUrl);

	const connectionStatus = {
		[ReadyState.CONNECTING]: "Connecting",
		[ReadyState.OPEN]: "Open",
		[ReadyState.CLOSING]: "Closing",
		[ReadyState.CLOSED]: "Closed",
		[ReadyState.UNINSTANTIATED]: "Uninstantiated",
	}[readyState];

	async function handleSelectRoom(roomId: string) {
		if (selectedRoomId) {
			sendJsonMessage({ action: "leave_user", room: selectedRoomId });
		}

		setSelectedRoomId(roomId);
		setSelectedReceiver(channels.find((c) => c.receiver.id === roomId)?.receiver || null);
		const { result: channel } = await getOrCreateChannel(roomId);
		if (channel.messages) {
			setCurrentMessages(channel.messages.map((m) => m));
		}
		console.log(channel);
		sendJsonMessage({ action: "join_user", room: channel.name });
	}

	async function handleSubmitMessage(message: string) {
		if (!selectedRoomId || message === "") return;
		const res = await sendMessage(selectedRoomId, { text: message });
		console.log(res);
	}

	useEffect(() => {
		async function getChannels() {
			const { result } = await getOwnChannels();
			setChannels(result);
		}

		getChannels();
	}, []);

	useEffect(() => {
		if (lastMessage !== null) {
			const message: RecieveMessage = JSON.parse(lastMessage.data);
			switch (message.action) {
				case "new_message": {
					const newMessage = camelizeKeys<Message>(message.data);
					setCurrentMessages((prev) => prev.concat(newMessage));
					break;
				}
				default:
					break;
			}
		}
	}, [lastMessage]);

	useEffect(() => {
		async function retryConnectWebsocket() {
			if (connectionStatus === "Closed") {
				const refreshToken = getCookie("refresh_token");
				if (refreshToken) {
					const { result } = await renewAccessToken({ refreshToken });
					setCookie("access_token", result.accessToken);
					setCookie("access_token_expired_at", result.accessTokenExpiredAt);
				}
			}
		}
		retryConnectWebsocket();
	}, [connectionStatus]);

	if (connectionStatus !== "Open") {
		return (
			<div className="pt-32">
				<h1>Chat</h1>
				<span>The WebSocket is currently {connectionStatus}</span>
			</div>
		);
	}

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
							active={selectedRoomId === c.receiver.id}
							channel={c}
							onClick={() => handleSelectRoom(c.receiver.id)}
						/>
					))}
				</div>
			</div>

			<div className="flex-1 relative">
				{!selectedRoomId ? (
					<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-[10rem]">
						<img src="/assets/icons/chat.png" alt="chat" className="w-[4.5rem] mb-2" />
						<span className="text-center">Choose your friend to start the conversation</span>
					</div>
				) : (
					<Fragment>
						<header className="bg-white p-4 text-gray-700">
							<h1 className="text-2xl font-semibold">{selectedReceiver?.displayName}</h1>
						</header>

						<div className="h-[calc(100vh-70px)] overflow-y-auto p-4 pb-36 bg-[#f5f5f5]">
							{currentMessages.map((m, idx) => (
								<MessageItem key={idx} message={m} isOwnMessage={m.author.id === user?.id} />
							))}
						</div>

						<footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-full">
							<Formik
								initialValues={{ text: "" }}
								onSubmit={async (values, { resetForm }) => {
									await handleSubmitMessage(values.text);
									resetForm();
								}}
							>
								{({ values, handleChange, handleSubmit }) => (
									<form onSubmit={handleSubmit} className="flex items-center">
										<input
											className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-indigo-600"
											type="text"
											name="text"
											placeholder={`Message to @${selectedReceiver?.displayName}`}
											value={values.text}
											onChange={handleChange}
										/>
										<button className="bg-indigo-600 text-white px-4 py-2 rounded-md ml-2">Send</button>
									</form>
								)}
							</Formik>
						</footer>
					</Fragment>
				)}
			</div>
		</div>
	);
}

type ChannelItemProps = {
	active: boolean;
	channel: GetOwnChannelsResponse[number];
	onClick: () => void;
};

function ChannelItem({ active, channel, onClick }: ChannelItemProps) {
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
				<p className="text-gray-600 line-clamp-1">{channel.lastMessage.text}</p>
			</div>
			<span className="text-xs text-gray-400 mt-1.5">{dayjs(channel.lastMessage.createdAt).fromNow()}</span>
		</div>
	);
}

type MessageItemProps = {
	message: Message;
	isOwnMessage: boolean;
};

function MessageItem({ message, isOwnMessage }: MessageItemProps) {
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
