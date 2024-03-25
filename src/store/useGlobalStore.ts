import { create } from "zustand";
import { logger } from "./logger";

interface GlobalState {
	isMenuActivated: boolean;
	isCoreMenuActivated: boolean;
	isProfileMenuActivated: boolean;
}

export interface GlobalStore extends GlobalState {
	toggleMenu: () => void;
	setCoreMenuActivated: (args: GlobalState["isCoreMenuActivated"]) => void;
	setProfileMenuActivated: (args: GlobalState["isProfileMenuActivated"]) => void;
}

const initialState: Pick<GlobalStore, keyof GlobalState> = {
	isMenuActivated: false,
	isCoreMenuActivated: false,
	isProfileMenuActivated: false,
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
			setCoreMenuActivated: (isCoreMenuActivated) => {
				set((state) => {
					return {
						isCoreMenuActivated,
						isProfileMenuActivated: isCoreMenuActivated ? false : state.isProfileMenuActivated,
					};
				});
			},
			setProfileMenuActivated: (isProfileMenuActivated) => {
				set((state) => {
					return {
						isProfileMenuActivated,
						isCoreMenuActivated: isProfileMenuActivated ? false : state.isCoreMenuActivated,
					};
				});
			},
		}),
		"globalStore",
	),
);

export default useGlobalStore;
