import { create } from "zustand";
import { logger } from "./logger";
import { getItem, setItem } from "@/libs/localStorage";
import { UpdateUserPayload, User } from "@/types/user";
import { updateUserById } from "@/services/api/user.api";
import { LoginPayload } from "@/types/auth";
import { login } from "@/services/api/auth.api";
import { setCookie } from "@/libs/cookie";

type AuthState = {
	isAuthenticated: boolean;
	user: User | null;
};

export interface AuthStore extends AuthState {
	setIsAuthenticated: (args: AuthState["isAuthenticated"]) => void;
	setUser: (args: AuthState["user"]) => void;
	loginAsync: (payload: LoginPayload) => Promise<void>;
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
					setCookie("session_id", res.result.sessionId);
					setCookie("access_token", res.result.accessToken);
					setCookie("access_token_expired_at", res.result.accessTokenExpiredAt);
					setCookie("refresh_token", res.result.refreshToken);
					setCookie("refresh_token_expired_at", res.result.refreshTokenExpiredAt);
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
