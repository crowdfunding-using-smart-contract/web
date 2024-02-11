import { useState } from "react";

type SearchBarProps = {
	placeholder: string;
	buttonText: string;
	action: (q: string) => void;
};

export default function SearchBar({ placeholder, buttonText, action }: SearchBarProps) {
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<form
			className="flex flex-col sm:flex-row justify-center gap-x-0 sm:gap-x-2 gap-y-2 sm:gap-y-0 mx-auto my-0 w-full"
			onSubmit={() => action(searchQuery)}
		>
			<input
				type="text"
				placeholder={placeholder}
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				className="h-16 sm:h-auto max-w-full sm:max-w-[420px] font-medium bg-[#F4F6F8] text-[#676e8b] w-full px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5340ff] duration-300"
			/>
			<button className="text-sm lg:text-base text-white font-medium rounded-md px-[26px] py-[18px] bg-[#5340ff]">
				{buttonText}
			</button>
		</form>
	);
}
