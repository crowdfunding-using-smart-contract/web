import { create } from "zustand";
import { logger } from "./logger";

interface GlobalState {
	isMenuActivated: boolean;
	isCoreMenuActivated: boolean;
	isProfileMenuActivated: boolean;
	isOpenProfilePicutureModal: boolean;
}

export interface GlobalStore extends GlobalState {
	toggleMenu: () => void;
	setMenuActivated: (args: GlobalState["isMenuActivated"]) => void;
	setCoreMenuActivated: (args: GlobalState["isCoreMenuActivated"]) => void;
	setProfileMenuActivated: (args: GlobalState["isProfileMenuActivated"]) => void;
	setIsOpenProfilePicutureModal: (args: GlobalState["isOpenProfilePicutureModal"]) => void;
}

const initialState: Pick<GlobalStore, keyof GlobalState> = {
	isMenuActivated: false,
	isCoreMenuActivated: false,
	isProfileMenuActivated: false,
	isOpenProfilePicutureModal: false,
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
			setMenuActivated: (args) => {
				set(() => {
					return { isMenuActivated: args };
				});
			},
			setCoreMenuActivated: (args) => {
				set((state) => {
					return {
						isCoreMenuActivated: args,
						isProfileMenuActivated: args ? false : state.isProfileMenuActivated,
						isOpenProfilePicutureModal: false,
					};
				});
			},
			setProfileMenuActivated: (args) => {
				set((state) => {
					return {
						isProfileMenuActivated: args,
						isCoreMenuActivated: args ? false : state.isCoreMenuActivated,
						isOpenProfilePicutureModal: false,
					};
				});
			},
			setIsOpenProfilePicutureModal(args) {
				set(() => {
					return {
						isOpenProfilePicutureModal: args,
						isProfileMenuActivated: false,
					};
				});
			},
		}),
		"globalStore",
	),
);

export default useGlobalStore;
