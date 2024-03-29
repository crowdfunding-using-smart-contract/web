import { useState } from "react";
import { Rating } from "@mantine/core";
import { motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";

const variants = {
	open: { opacity: 1 },
	closed: { opacity: 0 },
};

type RatingCardProps = {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (value: number) => void;
};

export default function RatingCard({ isOpen, onClose, onSubmit }: RatingCardProps) {
	const [isRated, setIsRated] = useState(false);

	return (
		<motion.div
			animate={isOpen ? "open" : "closed"}
			variants={variants}
			className="fixed bottom-3 left-3 p-3 border rounded-md bg-white opacity-0 flex flex-col items-center"
		>
			<div className="flex w-full justify-end mb-1">
				<div
					className="h-6 w-6 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-100"
					onClick={onClose}
				>
					<RxCross2 size={16} />
				</div>
			</div>
			<span className="text-sm font-medium mb-2">Rate your interest in this project</span>
			<Rating
				size={"lg"}
				fractions={2}
				defaultValue={0}
				readOnly={isRated}
				onChange={(v) => {
					setIsRated(true);
					onSubmit(v);
					setTimeout(() => {
						onClose();
					}, 2000);
				}}
			/>
		</motion.div>
	);
}
