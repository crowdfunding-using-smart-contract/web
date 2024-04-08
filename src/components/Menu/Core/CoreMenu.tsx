import useGlobalStore from "@/store/useGlobalStore";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineProject } from "react-icons/ai";
import { PiNotePencil } from "react-icons/pi";
import { Input } from "@mantine/core";
import { IoSearch } from "react-icons/io5";

export default function CoreMenu() {
	const { isCoreMenuActivated, setCoreMenuActivated } = useGlobalStore();

	if (!isCoreMenuActivated) {
		return null;
	}

	return (
		<div className="fixed z-10 top-20 right-5 p-4 rounded-xl bg-white shadow-md">
			<div className="flex flex-col relative max-w-[500px]">
				<div className="flex items-center justify-between">
					<h3 className="text-xl font-bold">Menu</h3>
					<div
						className="h-9 w-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-100"
						onClick={() => setCoreMenuActivated(false)}
					>
						<RxCross2 size={24} />
					</div>
				</div>
				<div className="flex mt-4 gap-x-4">
					<div className="flex-1 bg-[#f8f8f8] shadow rounded-xl p-3">
						<Input placeholder="Search menu" radius={"lg"} leftSection={<IoSearch />} />
						<div className="flex flex-col my-3 gap-y-1">
							<h5 className="font-medium">Social</h5>
							<div className="flex flex-col gap-y-1.5">
								<a href="/project" className="flex items-center gap-x-6 hover:bg-[#eeeeee] px-2 py-1 rounded">
									<img src="/assets/icons/project.png" alt="project" className="w-6 h-6" />
									<div className="flex flex-col">
										<h6 className="">Projects</h6>
										<p className="text-xs text-gray-500">
											Organize or find events and other things to do online and nearby.
										</p>
									</div>
								</a>
							</div>
						</div>
						<hr />
						<div className="flex flex-col mt-3 gap-y-1">
							<h5 className="font-medium">Community</h5>
							<div className="flex flex-col gap-y-1.5">
								<a href="/forum" className="flex items-center gap-x-6 hover:bg-[#eeeeee] px-2 py-1 rounded">
									<img src="/assets/icons/forum.png" alt="project" className="w-6 h-6" />
									<div className="flex flex-col">
										<h6 className="">Forum</h6>
										<p className="text-xs text-gray-500">
											Organize or find events and other things to do online and nearby.
										</p>
									</div>
								</a>
								<a href="/chat" className="flex items-center gap-x-6 hover:bg-[#eeeeee] px-2 py-1 rounded">
									<img src="/assets/icons/chat.png" alt="project" className="w-6 h-6" />
									<div className="flex flex-col">
										<h6 className="">Chat</h6>
										<p className="text-xs text-gray-500">
											Organize or find events and other things to do online and nearby.
										</p>
									</div>
								</a>
							</div>
						</div>
					</div>
					<div className="w-48 flex flex-col bg-[#f8f8f8] shadow rounded-xl p-3 h-max">
						<h4 className="text-lg font-semibold">Create</h4>
						<div className="flex flex-col mt-3 gap-y-1.5">
							<a href="/project/new" className="w-full flex items-center hover:bg-[#eeeeee] px-2 py-1 rounded">
								<div className="w-9 h-9 bg-gray-200 flex items-center justify-center rounded-full mr-3">
									<AiOutlineProject size={20} />
								</div>
								<span>Project</span>
							</a>
							<a href="/post/new" className="w-full flex items-center hover:bg-[#eeeeee] px-2 py-1 rounded">
								<div className="w-9 h-9 bg-gray-200 flex items-center justify-center rounded-full mr-3">
									<PiNotePencil size={20} />
								</div>
								<span>Post</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
