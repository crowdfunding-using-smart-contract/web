import React from "react";
import { useParams } from "react-router-dom";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaMapLocationDot } from "react-icons/fa6";
import { useGetProjectByIdQuery } from "@/services/query/project.query";
import dayjs from "dayjs";

export default function ProjectDetail() {
	const { projectId } = useParams();
	const { isLoading: fetchingProject, data: project } = useGetProjectByIdQuery(projectId);

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
					<span className="text-[#A7A7A7]">{project.owner.fullName}</span>
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
					<button className="bg-[#5340ff] text-white h-max py-2.5 px-12 rounded-lg text-lg font-medium shadow-lg">
						Back this project
					</button>
				</div>
			</section>
		</React.Fragment>
	);
}
