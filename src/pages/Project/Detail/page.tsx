import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaMapLocationDot } from "react-icons/fa6";
import { useGetProjectByIdQuery } from "@/services/query/project.query";
import dayjs from "dayjs";
import { Button } from "@mantine/core";
import { ProfileImage, RatingCard } from "@/components";
import { rateProject, verifyProjectRating } from "@/services/api/project.api";
import { MdAccountCircle, MdOutlineMailOutline, MdOutlineMarkChatUnread } from "react-icons/md";
import { GrSend } from "react-icons/gr";
import useAuthStore from "@/store/useAuthStore";
import { Project } from "@/types/project";
import { motion } from "framer-motion";

export default function ProjectDetail() {
	const { projectId } = useParams();
	const { isLoading: fetchingProject, data: project } = useGetProjectByIdQuery(projectId);
	const [isOpenRating, setIsOpenRating] = useState(false);

	async function handleSubmitRating(value: number) {
		if (!projectId) return;
		await rateProject(projectId, value);
	}

	useEffect(() => {
		async function verifyRating() {
			if (projectId) {
				const response = await verifyProjectRating(projectId);
				if (response.statusCode === 200) {
					setIsOpenRating(response.result);
				}
			}
		}
		verifyRating();
	}, [projectId]);

	if (fetchingProject) {
		return <div>Loading...</div>;
	}

	if (!project) {
		return <div className="pt-60">Project not found</div>;
	}

	const percentProgress = (project.currentFunding / project.targetFunding) * 100;

	return (
		<React.Fragment>
			<header className="max-w-screen-lg mx-auto pt-32 text-center">
				<h1 className="text-4xl font-bold">{project.title}</h1>
				<h2 className="text-2xl font-medium mt-3">{project.subTitle}</h2>
			</header>
			<section className="max-w-screen-md mx-auto mt-16">
				<div className="aspect-video w-full max-h-96 border rounded-lg">
					<img src={project.image} alt={project.title} className="w-full h-full object-cover rounded-lg" />
				</div>
				<div className="flex items-center justify-between mt-4 px-2">
					<div className="flex items-center gap-x-8">
						<div className="flex items-center">
							<BiSolidCategoryAlt size={24} className="mr-2" />
							<span>{project.category.name}</span>
						</div>
						<div className="flex items-center">
							<FaMapLocationDot size={24} className="mr-2" />
							<span>{project.location}</span>
						</div>
					</div>
					<ProjectOwner owner={project.owner} />
				</div>
			</section>
			<section className="max-w-screen-md mx-auto mt-8">
				<div className="flex flex-col gap-y-4">
					<p>{project.description}</p>
				</div>
			</section>
			<section className="max-w-screen-md mx-auto my-12">
				<div className="flex flex-col items-end">
					<h3 className="text-2xl font-medium">
						{project.currentFunding}/{project.targetFunding} {project.monetaryUnit}
					</h3>
					<div className="bg-[#D9D9D9] w-full h-6 rounded mt-2">
						<div
							className="bg-[#5340ff] h-full rounded"
							style={{
								width: `${percentProgress}%`,
							}}
						></div>
					</div>
				</div>
				<div className="flex items-start justify-between mt-12">
					<div className="flex flex-col justify-center">
						<span className="font-medium">
							<span className="text-2xl">560 </span>
							backers
						</span>
						<span className="font-medium text-2xl">
							{dayjs(project.endDate).from(dayjs(project.startDate), true)} left
						</span>
					</div>
					<Button size={"lg"} className="bg-primary">
						Back this project
					</Button>
				</div>
			</section>
			<RatingCard
				isOpen={!isOpenRating}
				onClose={() => setIsOpenRating(true)}
				onSubmit={(v) => handleSubmitRating(v)}
			/>
		</React.Fragment>
	);
}

function ProjectOwner({ owner }: { owner: Project["owner"] }) {
	const { user } = useAuthStore();
	const [isHovering, setIsHovering] = useState(false);

	return (
		<div
			className="relative flex gap-x-2 items-center cursor-pointer"
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			<ProfileImage src={owner.profileImage} alt={owner.displayName} firstLetter={owner.displayName[0]} size={32} />
			<span className="text-[#A7A7A7]">{owner.displayName}</span>
			<motion.div
				animate={isHovering ? "visible" : "hidden"}
				variants={{
					hidden: { opacity: 0, scale: 0 },
					visible: { opacity: 1, scale: 1 },
				}}
				className="absolute -top-1/2 left-[105%] p-3 bg-gray-200 rounded-lg"
			>
				<div className="flex flex-col items-center">
					<ProfileImage src={owner.profileImage} alt={owner.displayName} firstLetter={owner.displayName[0]} size={32} />
					<span>{owner.displayName}</span>
				</div>
				<div className="flex flex-col text-sm my-2">
					<div className="flex items-center gap-x-1.5">
						<MdAccountCircle size={18} />
						<span>{owner.fullName}</span>
					</div>
					<div className="flex items-center gap-x-1.5">
						<MdOutlineMailOutline size={18} />
						<span>{owner.email}</span>
					</div>
				</div>
				{owner.id !== user?.id && (
					<div className="flex items-center gap-x-2">
						<a href={`/chat/${owner.id}`}>
							<Button size="xs" className="bg-primary flex items-center">
								<MdOutlineMarkChatUnread size={14} className="mr-1.5" />
								<span>Chat</span>
							</Button>
						</a>
						<a href={`mailto:${owner.email}`}>
							<Button size="xs" className="bg-white text-font-primary border-primary">
								<GrSend size={14} className="mr-1.5" />
								<span>Send Mail</span>
							</Button>
						</a>
					</div>
				)}
			</motion.div>
		</div>
	);
}
