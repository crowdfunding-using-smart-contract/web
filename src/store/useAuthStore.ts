import { create } from "zustand";
import { logger } from "./logger";
import { getItem, setItem } from "@/libs/localStorage";
import { User } from "@/types/user";

type AuthState = {
	isAuthenticated: boolean;
	user: User | null;
};

export interface AuthStore extends AuthState {
	setIsAuthenticated: (args: AuthState["isAuthenticated"]) => void;
	setUser: (args: AuthState["user"]) => void;
}

const initialState: Pick<AuthStore, keyof AuthState> = {
	isAuthenticated: getItem("is_authenticated") || false,
	user: getItem("active_user") || null,
};

const useAuthStore = create<AuthStore>()(
	logger<AuthStore>(
		(set) => ({
			...initialState,
			setIsAuthenticated: (isAuthenticated) => {
				setItem("is_authenticated", isAuthenticated);
				set(() => ({ isAuthenticated }));
			},
			setUser: (user) => {
				setItem("active_user", user);
				set(() => ({ user }));
			},
		}),
		"authStore",
	),
);

export default useAuthStore;
