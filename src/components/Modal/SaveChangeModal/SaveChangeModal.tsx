import { Button } from "@mantine/core";
import { motion } from "framer-motion";

type SaveChangeModalProps = {
	active: boolean;
	onReset?: () => void;
	onSubmit?: () => void;
};

const variants = {
	visible: { opacity: 1, y: 0 },
	hidden: { opacity: 0, y: 20 },
};

export default function SaveChangeModal({ active, onReset, onSubmit }: SaveChangeModalProps) {
	return (
		<motion.div
			className="bg-white border rounded py-1.5 px-4 fixed z-10 bottom-4 shadow flex items-center justify-between w-[620px]"
			animate={active ? "visible" : "hidden"}
			variants={variants}
			style={{ left: "50%", translateX: "-50%" }}
		>
			<span>Careful - you have unsaved changes!</span>
			<div className="flex items-center gap-x-5">
				<span className="cursor-pointer hover:underline" onClick={onReset}>
					Reset
				</span>
				<Button className="bg-green-700 hover:bg-green-800" onClick={onSubmit}>
					Save Changes
				</Button>
			</div>
		</motion.div>
	);
}
