import { useNavigate } from "react-router-dom";
import { FaRegClock } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Project } from "@/types/project";
// import { useState } from "react";
import dayjs from "dayjs";

type ProjectCardProps = {
	project: Project;
};

// const variants = {
// 	open: { outline: "1px solid #ddd", padding: "12px" },
// 	closed: { outline: "1px solid #fff", padding: "6px" },
// };

export default function ProjectCard({ project }: ProjectCardProps) {
	const navigate = useNavigate();
	// const [isHovering, setIsHovering] = useState(false);

	function percentFunded(cur: number, tar: number) {
		return (cur / tar) * 100;
	}

	function formatDaysLeft(dateStr: string) {
		const endDate = dayjs(dateStr);
		const difference = endDate.diff(dayjs(), "day");
		return difference;
	}

	if (!project) return null;

	return (
		<motion.div
			className="relative flex min-w-80 flex-col rounded bg-white text-gray-800 cursor-pointer"
			onClick={() => navigate(`/project/${project.id}`)}
			// animate={isHovering ? "open" : "closed"}
			// variants={variants}
			// onHoverStart={() => setIsHovering(true)}
			// onHoverEnd={() => setIsHovering(false)}
		>
			<img src={project.image} alt={project.title} className="w-full object-cover aspect-video rounded-t-lg" />
			<motion.div
				className="w-full h-2 bg-primary rounded-bl-lg"
				initial={{ width: 0 }}
				animate={{ width: `${percentFunded(project.currentFunding, project.targetFunding)}%` }}
				transition={{ duration: 1 }}
			></motion.div>
			<div className="flex mt-4 gap-x-3">
				<img
					src={project.owner.profileImage}
					alt={project.owner.fullName}
					className="w-10 h-10 rounded-full object-cover border border-gray-200"
				/>
				<div className="flex flex-col">
					<h5 className="block font-sans text-lg font-medium leading-snug tracking-normal antialiased">
						{project.title}
					</h5>
					<span className="text-gray-500 text-sm">{project.owner.fullName}</span>
					<div className="flex items-center text-gray-600 text-sm">
						<div className="flex items-center gap-x-1.5">
							<FaRegClock size={14} />
							<span>{formatDaysLeft(project.endDate)} days left</span>
						</div>
						<span className="text-2xl mx-1">⋅</span>
						<span>{percentFunded(project.currentFunding, project.targetFunding)}% funded</span>
					</div>
					<p id="text" className="line-clamp-3 font-light text-sm">
						{project.description}
					</p>
					<div className="flex mt-3 text-sm gap-x-2">
						<span className="border border-gray-300 px-1.5 py-0.5 rounded-full">{project.subCategory.name}</span>
						<span className="border border-gray-300 px-1.5 py-0.5 rounded-full">{project.location}</span>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
