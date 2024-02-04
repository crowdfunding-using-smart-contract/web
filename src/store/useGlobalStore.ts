import { create } from "zustand";
import { logger } from "./logger";

interface GlobalState {
	isMenuActivated: boolean;
}

export interface GlobalStore extends GlobalState {
	toggleMenu: () => void;
}

const initialState: Pick<GlobalStore, keyof GlobalState> = {
	isMenuActivated: false,
};

const useGlobalStore = create<GlobalStore>()(
	logger<GlobalStore>(
		(set) => ({
			...initialState,
			toggleMenu: () => {
				set((state) => {
					return { isMenuActivated: !state.isMenuActivated };
				});
			},
		}),
		"globalStore",
	),
);

export default useGlobalStore;
