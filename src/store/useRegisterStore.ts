import { create } from "zustand";
import { logger } from "./logger";
import { RegisterPayload } from "@/types/auth";
import { register, sendVerifyEmail } from "@/services/api/auth.api";

export type RegisterActionType = "authentication" | "privacyProtection" | "personalInformation" | "verifyEmail";

type RegisterState = {
	isRegistering: boolean;
	action: RegisterActionType;
	payload: RegisterPayload;
};

export interface RegisterStore extends RegisterState {
	setAction: (action: RegisterState["action"]) => void;
	setPayload: (field: keyof RegisterPayload, value: string) => void;
	registerAsync: () => Promise<void>;
	sendVerifyEmailAsync: () => Promise<void>;
}

const initialState: Pick<RegisterStore, keyof RegisterState> = {
	isRegistering: false,
	action: "authentication",
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
		(set, get) => ({
			...initialState,
			setAction: (action) => {
				set(() => ({ action }));
			},
			setPayload: (field: keyof RegisterPayload, value: string) => {
				set((state) => ({ payload: { ...state.payload, [field]: value } }));
			},
			registerAsync: async () => {
				const payload = get().payload;
				set(() => ({ isRegistering: true }));
				try {
					const res = await register(payload);
					if (res.statusCode === 201) {
						set(() => ({ action: "verifyEmail" }));
					}
				} catch (error) {
					console.error("Failed to registration: ", error);
				} finally {
					set(() => ({ isRegistering: false }));
				}
			},
			sendVerifyEmailAsync: async () => {
				const email = get().payload.email;
				set(() => ({ isRegistering: true }));
				try {
					const res = await sendVerifyEmail({ email: email });
					if (res.statusCode === 200) {
						console.log("Email sent successfully");
					}
				} catch (error) {
					console.error("Failed to send verify email: ", error);
				} finally {
					set(() => ({ isRegistering: false }));
				}
			},
		}),
		"registerStore",
	),
);

export default useRegisterStore;
