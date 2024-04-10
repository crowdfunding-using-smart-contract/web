import { ConnectWalletButton, ProjectCard, SaveChangeModal } from "@/components";
import { getOwnProjects } from "@/services/api/project.api";
import { useGetBackedProjectsQuery } from "@/services/query/project.query";
import useAuthStore from "@/store/useAuthStore";
import useGlobalStore from "@/store/useGlobalStore";
import { Project } from "@/types/project";
import { Button } from "@mantine/core";
import dayjs from "dayjs";
import { useFormik } from "formik";
import React, { useState, useEffect, Fragment } from "react";
import { MdOutlineModeEdit } from "react-icons/md";

export default function ProfilePage() {
	const { isAuthenticated, user, getCurrentUserAsync, updateUserByIdAsync } = useAuthStore();
	const [currentSection, setCurrentSection] = useState<"about" | "created" | "backed">("about");
	const { setIsOpenProfilePicutureModal } = useGlobalStore();
	const [isHoveringProfilePicture, setIsHoveringProfilePicture] = useState(false);
	const [ownProjects, setOwnProjects] = useState<Project[]>([]);
	const { data: backedProjects } = useGetBackedProjectsQuery();

	const formik = useFormik({
		initialValues: {
			displayName: user?.displayName,
		},
		onSubmit: async (values, { resetForm }) => {
			if (!user) return;
			await updateUserByIdAsync(user.id, values);
			resetForm({ values: { displayName: values.displayName } });
		},
	});

	function onSectionChange(section: "about" | "created" | "backed") {
		setCurrentSection(section);
	}

	async function getOwnProjectAsync() {
		const { statusCode, result } = await getOwnProjects();
		if (statusCode === 200) {
			setOwnProjects(result);
		}
	}

	useEffect(() => {
		getCurrentUserAsync();
		getOwnProjectAsync();
	}, []);

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
					<div
						className="w-48 h-48 mx-auto bg-indigo-500 text-gray-100 rounded-full relative cursor-pointer"
						onMouseEnter={() => setIsHoveringProfilePicture(true)}
						onMouseLeave={() => setIsHoveringProfilePicture(false)}
						onClick={() => setIsOpenProfilePicutureModal(true)}
					>
						{user?.profileImage ? (
							<img src={user.profileImage} className="w-full h-full object-cover rounded-full" />
						) : (
							<div className="text-2xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
								{user?.fullName[0]}
							</div>
						)}
						<div
							className={`${isHoveringProfilePicture ? "bg-gray-300" : "bg-gray-200"} absolute bottom-4 right-4 w-6 h-6 rounded-full flex items-center justify-center`}
						>
							<MdOutlineModeEdit size={16} color={isHoveringProfilePicture ? "#2563eb" : "#222"} />
						</div>
					</div>
					{/* {user.profileImage ? (
						<img src={user.profileImage} alt="Profile" className="w-20 h-20 rounded-full mx-auto object-cover" />
					) : (
						<div className="w-36 h-36 rounded-full mx-auto bg-[#BBBBBB] flex items-center justify-center text-4xl text-gray-900">
							{user.fullName[0]}
						</div>
					)} */}
					<h2 className="font-bold text-3xl mt-3">{user.fullName}</h2>
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
						<div className="flex flex-col">
							<h3 className="text-xl font-semibold">Account</h3>
							<div className="flex flex-col w-1/2 mt-2.5 gap-y-2.5">
								<div className="flex flex-col">
									<label htmlFor="displayName">Display name</label>
									<input
										id="displayName"
										name="displayName"
										type="text"
										value={formik.values.displayName}
										onChange={formik.handleChange}
										className="mt-2 border p-2 focus:outline-indigo-500"
									/>
								</div>
								<div className="flex flex-col">
									<span>Email</span>
									<div className="flex items-center">
										<input
											type="text"
											value={user.email}
											disabled={true}
											className="mt-2 flex-1 border p-2 disabled:text-gray-400"
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-col mt-8">
							<h3 className="text-xl font-semibold">Payment</h3>
							<div className="flex flex-col w-1/2 mt-3">
								<ConnectWalletButton />
							</div>
						</div>
					</div>
				)}
				{currentSection === "created" && (
					<div className="max-w-screen-lg mx-auto my-16">
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
							{ownProjects.length > 0 ? (
								ownProjects.map((p) => <ProjectCard project={p} key={p.id} />)
							) : (
								<Fragment>
									<span>You don’t have any own project. Let’s create your idea!</span>
									<a href="/project/new" className="underline ml-2 text-[#5340FF]">
										Create Project
									</a>
								</Fragment>
							)}
						</div>
					</div>
				)}
				{currentSection === "backed" && (
					<div className="max-w-screen-lg mx-auto my-16">
						{backedProjects && backedProjects.length !== 0 ? (
							backedProjects.map((b, idx) => (
								<div key={idx} className="border rounded-md flex h-48">
									<img src={b.project.image} alt={b.project.title} className="aspect-video rounded-l-md" />
									<div className="flex flex-col justify-between py-3 px-6">
										<div className="flex flex-col">
											<span className="text-xl font-semibold">{b.project.title}</span>
											<span className="line-clamp-1">{b.project.subTitle}</span>
										</div>
										<span className="text-right text-lg font-semibold">Your invest: {b.fundAmount} OTK</span>
										<div className="flex justify-end gap-x-3">
											<Button className="bg-primary" onClick={() => console.log("Refund")}>
												Refund
											</Button>
											<a
												href={`https://testnet.snowtrace.io/address/${b.project.owner.metamaskAccountId}`}
												target="_blank"
											>
												<Button className="border-primary text-primary">Track transactions</Button>
											</a>
										</div>
									</div>
								</div>
							))
						) : (
							<span>You haven’t backed any project yet.</span>
						)}
					</div>
				)}
			</section>
			<SaveChangeModal active={formik.dirty} onReset={formik.resetForm} onSubmit={formik.handleSubmit} />
		</React.Fragment>
	);
}
