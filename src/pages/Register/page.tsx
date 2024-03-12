import { LanguagePicker, RegisterForm } from "@/components";
import { RegisterFlatImages } from "@/components/Image/RegisterFlatImage";
import useRegisterStore from "@/store/useRegisterStore";

export default function RegisterPage() {
	const { action } = useRegisterStore();

	return (
		<div className="w-screen min-h-screen h-full relative bg-slate-200">
			<div className="max-w-screen-xl w-11/12 flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-8">
				<div className="flex-1 flex flex-col">
					<div className="flex items-end">
						<img src="/assets/logo.png" alt="FundO" className="w-8 mr-2" />
						<h4 className="text-2xl font-black text-primary">FundO</h4>
					</div>
					<div className="w-full flex flex-col">
						<div className="flex flex-col items-center py-24 mr-0 sm:mr-8">
							<RegisterForm />
						</div>
						{action === "authentication" && <LanguagePicker />}
					</div>
				</div>
				<div className="flex-1 hidden lg:block">
					<RegisterFlatImages action={action} />
				</div>
			</div>
		</div>
	);
}
