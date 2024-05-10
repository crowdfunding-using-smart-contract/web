import { MessageItem } from "@/components";
import { getItem, setItem } from "@/libs/localStorage";
import { renewAccessToken } from "@/services/api/auth.api";
import { getOrCreateChannel, sendMessage } from "@/services/api/channel";
import useAuthStore from "@/store/useAuthStore";
import useChatStore from "@/store/useChatStore";
import { Message, RecieveMessage } from "@/types/channel";
import { Formik } from "formik";
import { camelizeKeys } from "humps";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";

export default function ChatDetailPage() {
	const { roomId } = useParams<{ roomId: string }>();
	const { user } = useAuthStore();
	const { channels } = useChatStore();
	const channel = channels.find((c) => c.receiver.id === roomId);
	const receiver = channel?.receiver;
	const webSocketUrl = `ws://localhost:3000/ws?token=${getItem("access_token")}`;
	const { readyState, sendJsonMessage, lastMessage } = useWebSocket(webSocketUrl);
	const [currentMessages, setCurrentMessages] = useState<Message[]>([]);

	const connectionStatus = {
		[ReadyState.CONNECTING]: "Connecting",
		[ReadyState.OPEN]: "Open",
		[ReadyState.CLOSING]: "Closing",
		[ReadyState.CLOSED]: "Closed",
		[ReadyState.UNINSTANTIATED]: "Uninstantiated",
	}[readyState];

	async function handleSubmitMessage(message: string) {
		if (!roomId || message === "") return;
		await sendMessage(roomId, { text: message });
	}

	useEffect(() => {
		async function connectRoom(roomId: string) {
			const { result: channel } = await getOrCreateChannel(roomId);
			if (channel.messages) {
				setCurrentMessages(channel.messages.map((m) => m));
			}
			sendJsonMessage({ action: "join_user", room: channel.name });
		}

		if (roomId) {
			connectRoom(roomId);
		}
	}, [roomId]);

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
				const refreshToken = getItem("refresh_token") as string;
				if (refreshToken) {
					const { result } = await renewAccessToken({ refreshToken });
					setItem("access_token", result.accessToken);
					setItem("access_token_expired_at", result.accessTokenExpiredAt);
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
		<Fragment>
			<header className="bg-white p-4 text-gray-700">
				<h1 className="text-2xl font-semibold">{receiver?.displayName}</h1>
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
								placeholder={`Message to @${receiver?.displayName}`}
								value={values.text}
								onChange={handleChange}
							/>
							<button className="bg-indigo-600 text-white px-4 py-2 rounded-md ml-2">Send</button>
						</form>
					)}
				</Formik>
			</footer>
		</Fragment>
	);
}
