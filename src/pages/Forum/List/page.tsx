import React, { useEffect, useState } from "react";
import { Input, Pagination, Select } from "@mantine/core";
import { IoSearch } from "react-icons/io5";
import { BiSolidCommentDots } from "react-icons/bi";
import { useListPostsQuery } from "@/services/query/forum.query";
import { useSearchParams } from "react-router-dom";
import { Post } from "@/types/forum";
import dayjs from "dayjs";

export default function ForumListPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [page, setPage] = useState<number>(parseInt(searchParams.get("page") || "1", 10));
	const { isLoading: fetchingPosts, data: posts, refetch: refetchPosts } = useListPostsQuery({ page: page });

	function onChangePageHandler(page: number) {
		setPage(page);
		searchParams.set("page", page.toString());
		setSearchParams(searchParams);
	}

	useEffect(() => {
		refetchPosts().then(() => {
			console.log("refetched");
		});
	}, [searchParams, refetchPosts]);

	console.log(posts);

	if (fetchingPosts || !posts) {
		return <div>Loading...</div>;
	}

	return (
		<React.Fragment>
			<header className="max-w-screen-lg mx-auto pt-24 px-4 lg:px-0">
				<h1 className="text-2xl font-bold">Forum</h1>
				<div className="flex flex-col sm:flex-row items-center justify-start mt-4 gap-3">
					<Input placeholder="Search" radius="md" leftSection={<IoSearch size={16} />} className="w-full sm:w-80" />
					<Select data={["Most Recent", "Popular"]} radius="md" placeholder="Sort By" className="w-full sm:w-auto" />
				</div>
			</header>
			<section className="max-w-screen-lg mx-auto px-4 lg:px-0 mt-8">
				<div className="flex flex-col gap-y-3">
					{posts.data.map((post) => (
						<PostItem key={post.id} post={post} />
					))}
				</div>
			</section>
			<div className="flex justify-center my-8">
				<Pagination
					total={posts.lastPage}
					color="#5340ff"
					variant="filled"
					value={page}
					onChange={(value) => onChangePageHandler(value)}
					styles={{
						control: {
							color: "#222",
						},
					}}
				/>
			</div>
		</React.Fragment>
	);
}

function PostItem({ post }: { post: Post }) {
	const createdAt = dayjs(post.createdAt)
		.fromNow()
		.replace(/^\w/, (c) => c.toUpperCase());

	return (
		<div className="border py-2 px-4 rounded-lg shadow-sm">
			<div className="flex items-start justify-between">
				<div className="flex flex-col flex-1">
					<h4 className="text-lg font-semibold">
						{post.title} ({post.project.title})
					</h4>
					<span className="text-sm line-clamp-1">{post.description}</span>
				</div>
				<span className="text-sm text-gray-500">{createdAt}</span>
			</div>
			<div className="flex items-center justify-between mt-3">
				<div className="flex gap-x-2 text-xs font-semibold">
					<span className="border border-gray-700 px-1.5 rounded-lg">{post.project.category.name}</span>
					<span className="px-1.5 rounded-lg bg-gray-200 text-gray-700">{post.project.subCategory.name}</span>
				</div>
				<div className="flex items-end">
					<BiSolidCommentDots size={16} color="#9ca3af" />
					<span className="text-sm text-gray-400 ml-1">{post.comments.length}</span>
				</div>
			</div>
		</div>
	);
}
