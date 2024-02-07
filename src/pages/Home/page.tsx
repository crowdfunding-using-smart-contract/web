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
		</React.Fragment>
	);
}
