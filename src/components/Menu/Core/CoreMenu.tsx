import useGlobalStore from "@/store/useGlobalStore";
import { CgProfile } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";

export default function CoreMenu() {
	const { isCoreMenuActivated, setCoreMenuActivated } = useGlobalStore();

	if (!isCoreMenuActivated) {
		return null;
	}

	return (
		<div className="fixed z-10 top-20 right-5 p-2 rounded-xl bg-white shadow-md">
			<div className="flex flex-col relative">
				<div
					className="absolute right-0 h-9 w-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-100"
					onClick={() => setCoreMenuActivated(false)}
				>
					<RxCross2 size={24} />
				</div>
				<a href="/dashboard" className="flex items-center gap-x-2 p-2 rounded-md hover:bg-gray-100">
					<CgProfile size={24} color={"#7f7f7f"} />
					<span>Profile</span>
				</a>
				<a href="/dashboard" className="flex items-center gap-x-2 p-2 rounded-md hover:bg-gray-100">
					<CgProfile size={24} color={"#7f7f7f"} />
					<span>Profile</span>
				</a>
				<a href="/dashboard" className="flex items-center gap-x-2 p-2 rounded-md hover:bg-gray-100">
					<CgProfile size={24} color={"#7f7f7f"} />
					<span>Profile</span>
				</a>
				<a href="/dashboard" className="flex items-center gap-x-2 p-2 rounded-md hover:bg-gray-100">
					<CgProfile size={24} color={"#7f7f7f"} />
					<span>Profile</span>
				</a>
				<a href="/dashboard" className="flex items-center gap-x-2 p-2 rounded-md hover:bg-gray-100">
					<CgProfile size={24} color={"#7f7f7f"} />
					<span>Profile</span>
				</a>
				<a href="/dashboard" className="flex items-center gap-x-2 p-2 rounded-md hover:bg-gray-100">
					<CgProfile size={24} color={"#7f7f7f"} />
					<span>Profile</span>
				</a>
			</div>
		</div>
	);
}
