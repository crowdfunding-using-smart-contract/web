import { useNavigate } from "react-router-dom";

type ProjectCardProps = {
	projectId: string;
};

export default function ProjectCard({ projectId }: ProjectCardProps) {
	const navigate = useNavigate();

	return (
		<div
			className="relative flex min-w-80 flex-col rounded bg-white text-gray-700 border"
			onClick={() => navigate(`/projects/${projectId}`)}
		>
			<div className="relative flex m-0 rounded-t text-gray-700 max-h-[256px] border-b">
				<img
					src="https://static.vecteezy.com/system/resources/previews/020/335/987/non_2x/netflix-logo-netflix-icon-free-free-vector.jpg"
					alt="ui/ux review check"
					className="w-full object-cover rounded-t"
				/>
			</div>
			<div className="flex flex-col gap-y-6 p-6">
				<div className="flex items-center">
					<h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
						Netfox
					</h4>
					<span className="ml-2 text-xl">- Technology(Web)</span>
				</div>
				<div className="relative overflow-hidden">
					<p id="text" className="line-clamp-3">
						The new era of a streaming service that offers a wide variety of award-winning TV shows, movies, anime,
						documentaries, and more on thousands of internet-connected devices.
					</p>
					<a href="#" className="bg-white text-blue-500 underline">
						View More
					</a>
				</div>
				<div className="flex items-center justify-between text-[#A7A7A7]">
					<span>Netfox Ltd.</span>
				</div>
			</div>
		</div>
	);
}
