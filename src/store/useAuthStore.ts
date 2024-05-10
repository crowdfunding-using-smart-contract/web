import { create } from "zustand";
import { logger } from "./logger";
import { getItem, setItem, removeItem } from "@/libs/localStorage";
import { UpdateUserPayload, User } from "@/types/user";
import { getCurrentUser, updateUserById } from "@/services/api/user.api";
import { LoginPayload } from "@/types/auth";
import { login } from "@/services/api/auth.api";

type AuthState = {
	isAuthenticated: boolean;
	user: User | null;
};

export interface AuthStore extends AuthState {
	setIsAuthenticated: (args: AuthState["isAuthenticated"]) => void;
	setUser: (args: AuthState["user"]) => void;
	loginAsync: (payload: LoginPayload) => Promise<void>;
	signOut: () => void;
	getCurrentUserAsync: () => Promise<void>;
	updateUserByIdAsync: (id: string, payload: UpdateUserPayload) => Promise<void>;
}

const initialState: Pick<AuthStore, keyof AuthState> = {
	isAuthenticated: getItem("is_authenticated") || false,
	user: getItem("active_user") || null,
};

const useAuthStore = create<AuthStore>()(
	logger<AuthStore>(
		(set, get) => ({
			...initialState,
			setIsAuthenticated: (isAuthenticated) => {
				setItem("is_authenticated", isAuthenticated);
				set(() => ({ isAuthenticated }));
			},
			setUser: (user) => {
				setItem("active_user", user);
				set(() => ({ user }));
			},
			loginAsync: async (payload) => {
				const res = await login(payload);
				if (res.statusCode === 200) {
					get().setIsAuthenticated(true);
					get().setUser(res.result.user);
					setItem("session_id", res.result.sessionId);
					setItem("access_token", res.result.accessToken);
					setItem("access_token_expired_at", res.result.accessTokenExpiredAt);
					setItem("refresh_token", res.result.refreshToken);
					setItem("refresh_token_expired_at", res.result.refreshTokenExpiredAt);
				}
			},
			signOut: () => {
				get().setIsAuthenticated(false);
				get().setUser(null);
				removeItem("session_id");
				removeItem("access_token");
				removeItem("access_token_expired_at");
				removeItem("refresh_token");
				removeItem("refresh_token_expired_at");
			},
			getCurrentUserAsync: async () => {
				try {
					const res = await getCurrentUser();
					if (res.statusCode === 200) {
						get().setIsAuthenticated(true);
						setItem("active_user", res.result);
						set(() => ({ user: res.result }));
					}
				} catch (error) {
					console.error("Failed to get current user: ", error);
				}
			},
			updateUserByIdAsync: async (id, payload) => {
				try {
					const res = await updateUserById(id, payload);
					if (res.statusCode === 200) {
						setItem("active_user", res.result);
						set(() => ({ user: res.result }));
					}
				} catch (error) {
					console.error("Failed to update user: ", error);
				}
			},
		}),
		"authStore",
	),
);

export default useAuthStore;
