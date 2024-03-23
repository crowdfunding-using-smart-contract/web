import { useEffect, useState } from "react";
import { BsFillImageFill, BsFillTrashFill } from "react-icons/bs";

type ImagePickerProps = {
	label: string;
	action: (file: File) => void;
};

export default function ImagePicker({ label, action }: ImagePickerProps) {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string>("");

	useEffect(() => {
		if (!selectedFile) {
			setPreview("");
			return;
		}

		const objectUrl = URL.createObjectURL(selectedFile);
		setPreview(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
	}, [selectedFile]);

	function handleChangeImage(event: React.ChangeEvent<HTMLInputElement>) {
		const files = event.target.files;
		if (files) {
			setSelectedFile(files[0]);
			action(files[0]);
		}
	}

	return (
		<label htmlFor={`${label}-image`} className="relative block w-full h-full bg-[#E7E7E7] rounded cursor-pointer">
			{!selectedFile ? (
				<div className="flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full shadow bg-[#F5F5F5]">
					<BsFillImageFill color="#929292" size={24} />
				</div>
			) : (
				<div
					className="flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full shadow bg-[#F5F5F5] hover:bg-gray-200 duration-200"
					onClick={() => setSelectedFile(null)}
				>
					<BsFillTrashFill color="#929292" size={24} />
				</div>
			)}
			<input
				id={`${label}-image`}
				type="file"
				accept="image/*"
				disabled={!!selectedFile}
				onChange={handleChangeImage}
				className="hidden"
			/>
			{selectedFile && <img src={preview} className="border border-gray-200 rounded" />}
		</label>
	);
}
