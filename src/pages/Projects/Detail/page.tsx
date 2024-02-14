import React from "react";
import { useParams } from "react-router-dom";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaMapLocationDot } from "react-icons/fa6";

export default function ProjectDetail() {
	const { projectId } = useParams();
	console.log("project_id", projectId);

	return (
		<React.Fragment>
			<header className="max-w-screen-lg mx-auto pt-32 text-center">
				<h1 className="text-4xl font-bold">Netfox</h1>
				<h2 className="text-2xl font-medium mt-3">The new era of a streaming service that born to kill Netflix</h2>
			</header>
			<section className="max-w-screen-md mx-auto mt-16">
				<div className="aspect-video w-full max-h-96 border rounded-lg">
					<img
						src="https://static.vecteezy.com/system/resources/previews/020/335/987/non_2x/netflix-logo-netflix-icon-free-free-vector.jpg"
						alt="ui/ux review check"
						className="w-full h-full object-cover rounded-lg"
					/>
				</div>
				<div className="flex items-center justify-between mt-4 px-2">
					<div className="flex items-center gap-x-8">
						<div className="flex items-center">
							<BiSolidCategoryAlt size={24} className="mr-2" />
							<span>Technology</span>
						</div>
						<div className="flex items-center">
							<FaMapLocationDot size={24} className="mr-2" />
							<span>Bangkok, Thailand</span>
						</div>
					</div>
					<span className="text-[#A7A7A7]">Netfox Ltd.</span>
				</div>
			</section>
			<section className="max-w-screen-md mx-auto mt-8">
				<div className="flex flex-col gap-y-4">
					<p>
						Netfox is a subscription-based streaming service that allows our members to watch TV shows and movies on an
						internet-connected device.
					</p>
					<p>
						Depending on your plan, you can also download TV shows and movies to your iOS, Android, or Windows 10 device
						and watch without an internet connection.
					</p>
					<p>
						If you're already a member and would like to learn more about using Netfox, visit Getting started with
						Netfox.
					</p>
				</div>
			</section>
			<section className="max-w-screen-md mx-auto my-12">
				<div className="flex flex-col items-end">
					<h3 className="text-2xl font-medium">฿ 6,000,000/10,000,000</h3>
					<div className="bg-[#D9D9D9] w-full h-6 rounded mt-2">
						<div className="bg-[#5340ff] h-full rounded w-[60%]"></div>
					</div>
				</div>
				<div className="flex justify-between mt-12">
					<div className="flex flex-col justify-center">
						<span className="font-medium">
							<span className="text-2xl">560 </span>
							backers
						</span>
						<span className="font-medium">
							<span className="text-2xl">32 </span>
							days left
						</span>
					</div>
					<button className="bg-[#5340ff] text-white py-4 px-12 rounded text-lg font-medium">Back this project</button>
				</div>
			</section>
		</React.Fragment>
	);
}
