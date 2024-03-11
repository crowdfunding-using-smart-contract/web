import useRegisterStore from "@/store/useRegisterStore";
import AuthenticationForm from "./AuthenticationForm";
import PrivacyProtectionForm from "./PrivacyProtectionForm";
import PersonalInformationForm from "./PersonalInformationForm";

export default function RegisterFormV2() {
	const { action } = useRegisterStore();

	switch (action) {
		case "authentication":
			return <AuthenticationForm />;
		case "privacyProtection":
			return <PrivacyProtectionForm />;
		case "personalInformation":
			return <PersonalInformationForm />;
		default:
			return null;
	}
}
