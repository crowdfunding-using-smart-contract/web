import React from "react";
import { Input, Select } from "@mantine/core";
import { IoSearch } from "react-icons/io5";
import { BiSolidCommentDots } from "react-icons/bi";

export default function ForumListPage() {
	return (
		<React.Fragment>
			<header className="max-w-screen-lg mx-auto pt-24 px-4 lg:px-0">
				<h1 className="text-2xl font-bold">Forum</h1>
				<div className="flex flex-col sm:flex-row items-center justify-start mt-4 gap-3">
					<Input placeholder="Search" radius="md" leftSection={<IoSearch size={16} />} className="w-full sm:w-80" />
					<Select
						data={["Most Recent", "Technology", "Business", "Entertainment"]}
						radius="md"
						placeholder="Sort By"
						className="w-full sm:w-auto"
					/>
				</div>
			</header>
			<section className="max-w-screen-lg mx-auto px-4 lg:px-0 mt-8">
				<div className="flex flex-col gap-y-3">
					<PostItem />
					<PostItem />
				</div>
			</section>
		</React.Fragment>
	);
}

function PostItem() {
	return (
		<div className="border py-2 px-4 rounded-lg shadow-sm">
			<div className="flex items-start justify-between">
				<div className="flex flex-col flex-1">
					<h4 className="text-lg font-semibold">Comment on feature request can't be sent</h4>
					<span className="text-sm line-clamp-1">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis cumque, nostrum neque exercitationem fugit ad
						repellat sed voluptates. Omnis natus, sit ab voluptatibus numquam nemo dicta odit atque libero? Laboriosam.
					</span>
				</div>
				<span className="text-sm text-gray-500">2 days ago</span>
			</div>
			<div className="flex items-center justify-between mt-3">
				<div className="flex gap-x-2 text-xs font-semibold">
					<span className="border border-gray-700 px-1.5 rounded-lg">Art</span>
					<span className="px-1.5 rounded-lg bg-gray-200 text-gray-700">Painting</span>
				</div>
				<div className="flex items-end">
					<BiSolidCommentDots size={16} color="#9ca3af" />
					<span className="text-sm text-gray-400 ml-1">2</span>
				</div>
			</div>
		</div>
	);
}
