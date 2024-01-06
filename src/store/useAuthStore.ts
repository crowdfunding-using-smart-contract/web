import { create } from "zustand";
import { logger } from "./logger";
import { getItem, setItem } from "@/libs/localStorage";

type AuthState = {
	isAuthenticated: boolean;
};

export interface AuthStore extends AuthState {
	setIsAuthenticated: (args: AuthState["isAuthenticated"]) => void;
}

const initialState: Pick<AuthStore, keyof AuthState> = {
	isAuthenticated: getItem("isAuthenticated") || false,
};

const useAuthStore = create<AuthStore>()(
	logger<AuthStore>(
		(set) => ({
			...initialState,
			setIsAuthenticated: (isAuthenticated) => {
				setItem("isAuthenticated", isAuthenticated);
				set(() => ({ isAuthenticated }));
			},
		}),
		"authStore",
	),
);

export default useAuthStore;
