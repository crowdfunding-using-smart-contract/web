import { DatePicker, HourPicker, MinutePicker } from "@/components";
import { useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import { dateFormatter } from "@/libs/date";

export default function NewProjectPage() {
	const [value, setValue] = useState<Date | null>(null);

	return (
		<div className="max-w-screen-lg mx-auto pt-32 px-4">
			<div className="flex flex-col items-center">
				<h1 className="text-[32px] text-[#222222] mb-3">Start a Project</h1>
				<p className="text-xl text-[#BBBBBB]">Make it easy for people to learn about your project.</p>
			</div>
			<div className="flex flex-col mt-16">
				<h4 className="text-lg font-semibold">Project Title</h4>
				<p className="text-[#797979]">
					Write a clear, brief title and subtitle to help people quickly understand your project. Both will appear on
					your project and pre-launch pages
				</p>
				<h5 className="font-medium mt-3 mb-2">Title</h5>
				<input
					type="text"
					placeholder="Aloe Bud: Self-care pocket companion for iOS"
					className="border w-full md:w-3/5 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#5340ff] duration-300"
				/>
				<h5 className="font-medium mt-3 mb-2">Subtitle</h5>
				<input
					type="text"
					placeholder="Gently brings awareness to self-care activities, using encouraging push notifications, rather than guilt or shame."
					className="border w-full px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#5340ff] duration-300"
				/>
			</div>
			<div className="flex flex-col mt-8">
				<h4 className="text-lg font-semibold">Project Category</h4>
				<p className="text-[#797979]">Enter the location that best describes where your project is based.</p>
				<div className="flex flex-col md:flex-row mt-3 w-full gap-x-8 gap-y-4">
					<div className="flex-1 flex flex-col">
						<h5 className="font-medium mb-2">Category</h5>
						<select className="w-full border p-2">
							<option hidden>Select Cateogry</option>
							<option value="A">Something</option>
						</select>
					</div>
					<div className="flex-1 flex flex-col">
						<h5 className="font-medium mb-2">Subcategory</h5>
						<select className="w-full border p-2">
							<option hidden>Select Subcateogry</option>
							<option value="A">Something</option>
						</select>
					</div>
				</div>
			</div>
			<div className="flex flex-col mt-8">
				<h4 className="text-lg font-semibold">Project Location</h4>
				<p className="text-[#797979]">Enter the location that best describes where your project is based.</p>
				<input
					type="text"
					placeholder="Bangkok, Thailand"
					className="border w-full md:w-1/2 mt-3 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#5340ff] duration-300"
				/>
			</div>
			<div className="flex flex-col mt-8">
				<h4 className="text-lg font-semibold">Project Image</h4>
				<p className="text-[#797979]">
					Add an image that clearly represents your project. Choose one that looks good at different sizes—it’ll appear
					on your project page, across the website, and (when shared) on social channels.
				</p>
				<p className="text-[#797979] mt-2">
					Your image should be at least 1024x576 pixels. It will be cropped to a 16:9 ratio.
				</p>
				<div className="aspect-video w-full lg:w-1/2 mt-8">
					<label htmlFor="project-image" className="relative block w-full h-full bg-[#E7E7E7] rounded cursor-pointer">
						<div className="flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full shadow bg-[#F5F5F5]">
							<BsFillImageFill color="#929292" size={24} />
						</div>
						<input id="project-image" type="file" accept="image/*" className="hidden" />
					</label>
				</div>
			</div>
			<div className="flex flex-col mt-8">
				<h4 className="text-lg font-semibold">Project's Campaign Duration</h4>
				<p className="text-[#797979]">
					Set a time limit for your campaign. You won’t be able to change this after you launch.
				</p>
				<div className="flex gap-x-2 items-end mt-3">
					<div className="flex flex-col">
						<span className="text-sm">Month</span>
						<span className="border px-4 py-3">{dateFormatter(value, "MMMM")}</span>
					</div>
					<div className="flex flex-col">
						<span className="text-sm">Day</span>
						<span className="border px-4 py-3">{dateFormatter(value, "D")}</span>
					</div>
					<div className="flex flex-col">
						<span className="text-sm">Year</span>
						<span className="border px-4 py-3">{dateFormatter(value, "YYYY")}</span>
					</div>
					<DatePicker value={value} setValue={setValue} />
				</div>
				<div className="flex flex-col gap-x-2 mt-3">
					<span className="text-sm">Time</span>
					<div className="flex">
						<HourPicker />
						<span className="px-2 py-3">:</span>
						<MinutePicker />
					</div>
				</div>
				<div className="flex justify-center mt-8 mb-24">
					<button className="w-max bg-[#5340FF] text-white rounded-sm py-4 px-12 text-md lg:text-lg font-medium">
						Create Project
					</button>
				</div>
			</div>
		</div>
	);
}
