import useAuthStore from "@/store/useAuthStore";
import { RxCross2 } from "react-icons/rx";
import { VscSignOut } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { MdOutlineModeEdit } from "react-icons/md";
import useGlobalStore from "@/store/useGlobalStore";
import { useState } from "react";

export default function UserProfileMenu() {
	const { user } = useAuthStore();
	const { isProfileMenuActivated, setProfileMenuActivated, setIsOpenProfilePicutureModal } = useGlobalStore();
	const [isHoveringProfilePicture, setIsHoveringProfilePicture] = useState(false);

	if (!isProfileMenuActivated) {
		return null;
	}

	return (
		<div className="fixed z-10 top-20 right-5 p-2 rounded-xl bg-white shadow-md">
			<div className="flex flex-col relative">
				<div
					className="absolute right-0 h-9 w-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-100"
					onClick={() => setProfileMenuActivated(false)}
				>
					<RxCross2 size={24} />
				</div>
				<p className="text-sm font-medium text-center my-2">{user?.email}</p>
				<div className="flex flex-col items-center my-4">
					<div
						className="w-24 h-24 bg-indigo-500 text-gray-100 rounded-full relative cursor-pointer"
						onMouseEnter={() => setIsHoveringProfilePicture(true)}
						onMouseLeave={() => setIsHoveringProfilePicture(false)}
						onClick={() => setIsOpenProfilePicutureModal(true)}
					>
						{user?.profileImage ? (
							<img src={user.profileImage} className="w-full h-full rounded-full" />
						) : (
							<div className="text-2xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
								{user?.fullName[0]}
							</div>
						)}
						<div
							className={`${isHoveringProfilePicture ? "bg-gray-300" : "bg-gray-200"} absolute bottom-1 right-1 w-6 h-6 rounded-full flex items-center justify-center`}
						>
							<MdOutlineModeEdit size={16} color={isHoveringProfilePicture ? "#2563eb" : "#222"} />
						</div>
					</div>
					<h2 className="text-xl mt-1">Hi, {user?.fullName.split(" ")[0]}!</h2>
				</div>
				<div className="min-w-80 flex flex-col gap-y-2 mb-3">
					<a href="/profile" className="flex items-center gap-x-3 py-2 px-4 rounded-md hover:bg-gray-100">
						<div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
							<CgProfile size={20} />
						</div>
						<span>Profile</span>
					</a>
					<a href="/profile" className="flex items-center gap-x-3 py-2 px-4 rounded-md hover:bg-gray-100">
						<div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
							<VscSignOut size={20} />
						</div>
						<span>Sign out</span>
					</a>
				</div>
				<div className="flex justify-center text-xs font-medium gap-x-2 my-2">
					<button className="py-0.5 px-1.5 rounded hover:bg-gray-100">Privacy Policy</button>
					<span className="py-0.5">⋅</span>
					<button className="py-0.5 px-1.5 rounded hover:bg-gray-100">Terms of Service</button>
				</div>
			</div>
		</div>
	);
}
