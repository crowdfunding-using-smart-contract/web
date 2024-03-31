import { useDisableBodyScroll } from "@/hooks/useDisableBodyScrool";
import useAuthStore from "@/store/useAuthStore";
import useGlobalStore from "@/store/useGlobalStore";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function ProfilePictureModal() {
	const { user, updateUserByIdAsync } = useAuthStore();
	const { isOpenProfilePicutureModal, setIsOpenProfilePicutureModal } = useGlobalStore();
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string>("");

	useDisableBodyScroll(isOpenProfilePicutureModal);

	function handleChangeImage(event: React.ChangeEvent<HTMLInputElement>) {
		const files = event.target.files;
		if (files) {
			setSelectedFile(files[0]);
		}
	}

	function handleCloseModal() {
		setIsOpenProfilePicutureModal(false);
		setSelectedFile(null);
	}

	function handleSaveImage() {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Yes, save it!",
			showLoaderOnConfirm: true,
			confirmButtonColor: "#2563eb",
			cancelButtonText: "No, cancel!",
			cancelButtonColor: "#dc2626",
			allowOutsideClick: () => false,
			preConfirm: async () => {
				if (!user) {
					Swal.fire("Error!", "You are not authenticated", "error");
					return;
				}
				try {
					await updateUserByIdAsync(user.id, { profileImage: selectedFile });
				} catch (error) {
					Swal.fire("Error!", "Failed to save your profile picture", "error");
				}
			},
		}).then(async (result) => {
			if (result.isConfirmed) {
				Swal.fire("Saved!", "Your profile picture has been saved.", "success");
				handleCloseModal();
			}
		});
	}

	useEffect(() => {
		if (!selectedFile) {
			setPreview("");
			return;
		}

		const objectUrl = URL.createObjectURL(selectedFile);
		setPreview(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
	}, [selectedFile]);

	if (!isOpenProfilePicutureModal) {
		return null;
	}

	return (
		<div className="w-screen h-screen fixed overflow-hidden z-40 top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.7)]">
			<div className="bg-white absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl p-3 rounded-lg">
				<div className="flex flex-col max-w-[400px]">
					<div className="flex items-center justify-end">
						<button
							className="h-9 w-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-100"
							onClick={handleCloseModal}
						>
							<RxCross2 size={24} />
						</button>
					</div>
					<div className="flex flex-col mt-3 px-3">
						<h3 className="text-lg text-font-primary">Profile picture</h3>
						<p className="text-sm text-gray-500">
							A picture helps people recognize you and lets you know when you’re signed in to your account
						</p>
					</div>
					<div className="w-64 h-64 mx-auto my-6 bg-[#f5f5f5] rounded-full relative">
						<Image
							isSelected={!!selectedFile}
							preview={preview}
							profileImage={user?.profileImage}
							firstCharacterName={user?.fullName[0]}
						/>
					</div>
					<div className="flex gap-x-3 px-3">
						<label htmlFor="profile-image" className="block flex-1">
							<div className="flex items-center justify-center text-sm font-semibold text-amber-500 border border-amber-500 rounded py-2 cursor-pointer hover:bg-amber-100">
								<MdOutlineModeEdit size={18} className="mr-2.5" />
								<span>Change</span>
							</div>
						</label>
						<input id="profile-image" type="file" accept="image/*" onChange={handleChangeImage} className="hidden" />
						<button
							disabled={!selectedFile}
							onClick={handleSaveImage}
							className="flex-1 flex items-center justify-center rounded border border-blue-500 text-blue-500 text-sm font-semibold hover:bg-blue-100 disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-300 disabled:hover:bg-bg-gray-200 disabled:hover:cursor-not-allowed duration-200"
						>
							<IoIosSave size={18} className="mr-2.5" />
							<span>Save</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

type ImageProps = {
	isSelected: boolean;
	preview: string;
	profileImage?: string;
	firstCharacterName?: string;
};

function Image({ isSelected, preview, profileImage, firstCharacterName }: ImageProps) {
	if (isSelected) {
		return <img src={preview} alt="profile" className="w-full h-full rounded-full object-cover" />;
	}

	if (profileImage) {
		return <img src={profileImage} alt="profile" className="w-full h-full rounded-full object-cover" />;
	}

	return (
		<span className="text-2xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
			{firstCharacterName}
		</span>
	);
}
