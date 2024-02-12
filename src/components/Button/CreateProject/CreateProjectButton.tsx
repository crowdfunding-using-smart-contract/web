import { Link } from "react-router-dom";

export default function CreateProjectButton() {
	return (
		<Link to="/projects/new">
			<button className="text-base lg:text-xl py-6 px-10 font-medium bg-[#0f0f0f] text-white rounded">
				Let’s create your creativity project!
			</button>
		</Link>
	);
}
