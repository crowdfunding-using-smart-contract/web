import { ConnectWalletButton } from "@/components";
import useAuthStore from "@/store/useAuthStore";
import dayjs from "dayjs";
import React from "react";

export default function ProfilePage() {
	const { isAuthenticated, user } = useAuthStore();
	const [currentSection, setCurrentSection] = React.useState<"about" | "created" | "backed">("about");

	function onSectionChange(section: "about" | "created" | "backed") {
		setCurrentSection(section);
	}

	if (!isAuthenticated || !user) {
		return (
			<React.Fragment>
				<header className="max-w-screen-lg mx-auto pt-32 bg-red-500">
					<div className="flex flex-col text-center">
						<h1>You are not authenticated</h1>
					</div>
				</header>
			</React.Fragment>
		);
	}

	return (
		<React.Fragment>
			<header className="max-w-screen-lg mx-auto pt-32">
				<div className="flex flex-col text-center">
					{user.profileImage ? (
						<img src={user.profileImage} alt="Profile" className="w-20 h-20 rounded-full mx-auto object-cover" />
					) : (
						<div className="w-36 h-36 rounded-full mx-auto bg-[#BBBBBB] flex items-center justify-center text-4xl text-gray-900">
							{user.fullName[0]}
						</div>
					)}
					<h2 className="font-bold text-2xl mt-3">{user.fullName}</h2>
					<span className="text-[#BBBBBB]">
						Joined at {dayjs(user.createdAt).format("MMMM")} {dayjs(user.createdAt).format("YYYY")}
					</span>
				</div>
			</header>
			<section className="mt-16">
				<hr />
				<div className="mx-auto flex justify-between w-max gap-x-24 py-6">
					<div
						className={`px-8 cursor-pointer ${currentSection === "about" ? "font-bold" : ""}`}
						onClick={() => onSectionChange("about")}
					>
						<span>About</span>
					</div>
					<div
						className={`px-8 cursor-pointer ${currentSection === "created" ? "font-bold" : ""}`}
						onClick={() => onSectionChange("created")}
					>
						<span>Created Projects</span>
					</div>
					<div
						className={`px-8 cursor-pointer ${currentSection === "backed" ? "font-bold" : ""}`}
						onClick={() => onSectionChange("backed")}
					>
						<span>Backed Projects</span>
					</div>
				</div>
				<hr />
				{currentSection === "about" && (
					<div className="max-w-screen-lg mx-auto my-16">
						<div>
							<h3 className="text-xl font-semibold">Account</h3>
							<div className="flex flex-col w-1/2 mt-8">
								<span>Email</span>
								<span className="mt-2 border p-2 text-gray-400">{user.email}</span>
							</div>
							<div className="flex flex-col w-1/2 mt-4">
								<span>Password</span>
								<button className="mt-2 py-2 px-12 border border-[#5340FF] text-[#5340FF] w-max">
									Change Password
								</button>
							</div>
						</div>
						<div className="mt-16">
							<h3 className="text-xl font-semibold">Payment</h3>
							<div className="flex flex-col w-1/2 mt-3">
								<ConnectWalletButton />
								{/* <span>Crypto Wallet</span> */}
								{/* <span className="mt-2 border p-2 text-gray-400">0x7f533b5fbf6ef86c3b7df76cc27fc67744a9a760</span> */}
							</div>
						</div>
					</div>
				)}
				{currentSection === "created" && (
					<div className="max-w-screen-lg mx-auto my-16">
						<span>You don’t have any own project. Let’s create your idea!</span>
						<a href="/project/new" className="underline ml-2 text-[#5340FF]">
							Create Project
						</a>
					</div>
				)}
				{currentSection === "backed" && (
					<div className="max-w-screen-lg mx-auto my-16">
						<img src="/assets/mock.png" alt="" />
					</div>
				)}
			</section>
		</React.Fragment>
	);
}
