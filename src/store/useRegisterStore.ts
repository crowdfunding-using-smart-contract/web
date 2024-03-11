import { create } from "zustand";
import { logger } from "./logger";
import { getItem, setItem } from "@/libs/localStorage";
import { RegisterPayload } from "@/types/auth";

export type RegisterActionType = "authentication" | "privacyProtection" | "personalInformation";

type RegisterState = {
	action: RegisterActionType;
	payload: RegisterPayload;
};

export interface RegisterStore extends RegisterState {
	setAction: (action: RegisterState["action"]) => void;
	setPayload: (field: keyof RegisterPayload, value: string) => void;
}

const initialState: Pick<RegisterStore, keyof RegisterState> = {
	action: getItem("register_action") || "authentication",
	payload: {
		email: "",
		password: "",
		passwordConfirmation: "",
		firstname: "",
		lastname: "",
		birthdate: "",
		gender: "",
	},
};

const useRegisterStore = create<RegisterStore>()(
	logger<RegisterStore>(
		(set) => ({
			...initialState,
			setAction: (action) => {
				setItem("register_action", action);
				set(() => ({ action }));
			},
			setPayload: (field: keyof RegisterPayload, value: string) => {
				set((state) => ({ payload: { ...state.payload, [field]: value } }));
			},
			register: async (payload: RegisterPayload) => {
				return Promise.resolve(payload);
			},
		}),
		"registerStore",
	),
);

export default useRegisterStore;
