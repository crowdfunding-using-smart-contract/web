import { api } from "@/libs/api";
import { parseToFormData } from "@/libs/formData";
import { Channel, GetOwnChannelsResponse, Message, MessageCreatePayload } from "@/types/channel";
import { ResultResponse } from "@/types/response";

export async function getOwnChannels(): Promise<ResultResponse<GetOwnChannelsResponse>> {
	const { data } = await api.get("/api/channels/me");

	return data;
}

export async function getOrCreateChannel(recipientId: string): Promise<ResultResponse<Channel>> {
	const { data } = await api.get(`/api/channels/${recipientId}`);

	return data;
}

export async function sendMessage(
	recipientId: string,
	payload: MessageCreatePayload,
): Promise<ResultResponse<Message>> {
	const formData = parseToFormData<MessageCreatePayload>(payload);
	const { data } = await api.post(`/api/channels/${recipientId}/messages`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return data;
}
