import React from "react";
import { CreateProjectButton, Footer, SearchBar } from "@/components";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Homepage() {
	const { t } = useTranslation();
	const navigate = useNavigate();

	function handleSearch(searchQuery: string): void {
		navigate(`/project?q=${searchQuery}`);
		return;
	}

	return (
		<React.Fragment>
			<header className="max-w-4xl my-0 mx-auto p-6 w-full pt-32 lg:pt-44 text-center">
				<h1 className="text-4xl lg:text-5xl font-bold text-[#090b17]">Build your next idea even faster</h1>
				<p className="mt-8 text-base lg:text-xl font-medium text-[#676e8b]">
					{t("name")} is Crowdfunding systems that use blockchain technology typically involve a project creator setting
					a funding goal and backers contributing to the project using cryptocurrency.
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
			<section className="max-w-screen-lg mx-auto mt-24 px-4">
				<p className="uppercase font-semibold">recommend for you</p>
				<div className="flex w-full gap-x-6 overflow-auto mt-6">
					{/* {[1, 2, 3, 4, 5, 6].map((_, index) => (
						<ProjectCard projectId={`${index + 1}`} key={index} />
					))} */}
				</div>
			</section>
			<section className="max-w-screen-lg mx-auto mt-24 px-4 text-center">
				<h2 className="font-bold text-2xl">Popular Creator</h2>
				<div className="flex flex-col md:flex-row justify-between mt-10">
					<div className="flex items-center md:flex-col">
						<div className="w-40 md:w-56 h-40 md:h-56 mr-8 mb-4">
							<img
								src="https://www.wilsoncenter.org/sites/default/files/media/images/person/james-person-1.jpg"
								alt="popular-creator-1"
								className="w-full h-full object-cover rounded-xl md:rounded-full"
							/>
						</div>
						<h3 className="text-xl font-medium">John Doe</h3>
					</div>
					<div className="flex items-center md:flex-col">
						<div className="w-40 md:w-56 h-40 md:h-56 mr-8 mb-4">
							<img
								src="https://www.wilsoncenter.org/sites/default/files/media/images/person/james-person-1.jpg"
								alt="popular-creator-2"
								className="w-full h-full object-cover rounded-xl md:rounded-full"
							/>
						</div>
						<h3 className="text-xl font-medium">John Doe</h3>
					</div>
					<div className="flex items-center md:flex-col">
						<div className="w-40 md:w-56 h-40 md:h-56 mr-8 mb-4">
							<img
								src="https://www.wilsoncenter.org/sites/default/files/media/images/person/james-person-1.jpg"
								alt="popular-creator-2"
								className="w-full h-full object-cover rounded-xl md:rounded-full"
							/>
						</div>
						<h3 className="text-xl font-medium">John Doe</h3>
					</div>
				</div>
			</section>
			<section className="bg-[#5340FF] py-24 mt-24 px-4">
				<div className="flex flex-col md:flex-row items-center gap-y-8 max-w-screen-lg mx-auto">
					<div className="flex-1 flex flex-col gap-y-6 text-white">
						<h1 className="font-black text-3xl md:text-4xl text-center md:text-left">
							Ready to make a project to help the world ?
						</h1>
						<p className="text-sm lg:text-base">
							Embarking on a creative journey with a creativity idea but lacking the necessary funds. Look no further
							than FundO – your gateway to turning imaginative dreams into reality.
						</p>
					</div>
					<div className="flex-1 text-end">
						<CreateProjectButton />
					</div>
				</div>
			</section>
			<Footer />
		</React.Fragment>
	);
}

// src="https://static.vecteezy.com/system/resources/previews/020/335/987/non_2x/netflix-logo-netflix-icon-free-free-vector.jpg"
