import { RegisterActionType } from "@/store/useRegisterStore";

type RegisterFlatImagesProps = {
	action: RegisterActionType;
};

export function RegisterFlatImages({ action }: RegisterFlatImagesProps) {
	switch (action) {
		case "authentication":
			return <img src="/assets/flat-email.jpg" className="object-cover w-full h-full rounded-2xl" />;
		case "privacyProtection":
			return (
				<img
					src="https://imgix.bustle.com/uploads/image/2020/3/3/ad0ffa5f-d05e-4db0-b69e-a0ae3778eb9b-gettyimages-1135481871.jpg"
					className="object-cover w-full h-full rounded-2xl"
				/>
			);
		case "personalInformation":
			return <img src="/assets/flat-email.jpg" className="object-cover w-full h-full rounded-2xl" />;
		case "verifyEmail":
			return <img src="/assets/flat-email.jpg" className="object-cover w-full h-full rounded-2xl" />;
		default:
			return null;
	}
}
