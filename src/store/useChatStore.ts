import { getOwnChannels } from "@/services/api/channel";
import { GetOwnChannelsResponse } from "@/types/channel";
import { create } from "zustand";

type ChatState = {
	channels: GetOwnChannelsResponse;
};

export interface ChatStore extends ChatState {
	// setChannels: (args: ChatState["channels"]) => void;
	getChannelsAsync: () => Promise<void>;
}

const initialState: Pick<ChatStore, keyof ChatState> = {
	channels: [],
};

const useChatStore = create<ChatStore>((set) => ({
	...initialState,
	getChannelsAsync: async () => {
		const { result, statusCode } = await getOwnChannels();
		if (statusCode === 200) {
			set(() => ({ channels: result }));
		}
	},
}));

export default useChatStore;
