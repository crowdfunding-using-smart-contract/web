import { User } from "./user";

export type Channel = {
	id: string;
	name: string;
	messages: Message[] | null;
	members: User[];
};

export type Message = {
	text: string | null;
	attachment: string | null;
	author: User;
	createdAt: string;
};

export type RecieveMessage = {
	action: string;
	data: Message;
};

export type MessageCreatePayload = Partial<Pick<Message, "text" | "attachment">>;

export type GetOwnChannelsResponse = {
	receiver: User;
	lastMessage: Message | null;
}[];
