import useRegisterStore from "@/store/useRegisterStore";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function VerifyEmailForm() {
	const { isRegistering, payload, sendVerifyEmailAsync } = useRegisterStore();
	const navigate = useNavigate();

	return (
		<div className="w-full sm:w-96 flex flex-col">
			<h1 className="text-2xl font-bold">Verify Your Email</h1>
			<p className="text-sm">
				We have just send email verification link to <span className="underline font-semibold">{payload.email}</span>.
				Please check email and click on that link to verify your Email address.
			</p>
			<div className="my-10 mx-auto">
				<img src="/assets/email-sent.jpg" alt="email-sent" className="w-24" />
			</div>
			<div className="flex text-sm mt-3 gap-x-2">
				<Button variant="filled" color={"#5533ff"} radius="md" onClick={sendVerifyEmailAsync}>
					{isRegistering ? "Loading..." : "Resend verification link"}
				</Button>
				<Button variant="subtle" color={"#5533ff"} radius="md" onClick={() => navigate("/")}>
					Skip
				</Button>
			</div>
		</div>
	);
}
