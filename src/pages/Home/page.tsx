import React from "react";
import { SearchBar } from "@/components";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
	const navigate = useNavigate();

	function handleSearch(searchQuery: string): void {
		navigate(`/search?q=${searchQuery}`);
		return;
	}

	return (
		<React.Fragment>
			<header className="max-w-4xl my-0 mx-auto p-6 w-full pt-32 lg:pt-44 text-center">
				<h1 className="text-4xl lg:text-5xl font-bold text-[#090b17]">Build your next idea even faster</h1>
				<p className="mt-8 text-base lg:text-xl font-medium text-[#676e8b]">
					FundO is Crowdfunding systems that use blockchain technology typically involve a project creator setting a
					funding goal and backers contributing to the project using cryptocurrency.
				</p>
				<div className="mt-10">
					<SearchBar placeholder="Enter your interested project" buttonText="Let's See!" action={handleSearch} />
				</div>
			</header>
			<section className="max-w-screen-lg mx-auto mt-24 px-4">
				<p className="uppercase font-semibold">feature project</p>
				<div className="mt-6">
					<div className="relative w-full pt-[56.25%] max-h-96">
						<img
							src="https://ksr-ugc.imgix.net/assets/043/518/536/0458aa3b3433622e49458cb10f2f691c_original.jpg?ixlib=rb-4.1.0&crop=faces&w=1552&h=873&fit=crop&v=1704137464&auto=format&frame=1&q=92&s=392e869e586f2c76efd3cd72f194fe31"
							alt=""
							className="absolute top-0 left-0 w-full h-full object-contain rounded-t-md"
						/>
						<div className="absolute bottom-0 w-3/4 h-3 bg-[#ece755]"></div>
					</div>
					<div className="flex flex-col gap-y-3 p-6 bg-[#F4F6F8] rounded-b-md">
						<h2 className="font-bold text-2xl">Glow in the Dark Glass Marbles</h2>
						<p className="leading-5">
							Introducing two new styles of glow-in-the-dark marbles: the double helix and swirl design are now
							available as part of the annual Make 100 Open Call.
						</p>
						<p className="text-[#A7A7A7]">By Tyler Kathol</p>
					</div>
				</div>
			</section>
		</React.Fragment>
	);
}
