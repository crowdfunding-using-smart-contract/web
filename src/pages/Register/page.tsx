import { RegisterForm } from "@/components";

export default function RegisterPage() {
	return (
		<div className="w-screen min-h-screen h-full relative bg-[#3E3E3E]">
			<div className="max-w-screen-md w-11/12 md:w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F5F5F5] text-center pt-12 px-0 md:px-32 pb-8 rounded-lg">
				<img src="/assets/FundO.png" alt="FundO" className="w-48 mx-auto" />
				<hr className="my-8 bg-[#777777]" />
				<div className="w-80 flex flex-col mx-auto text-center gap-y-4">
					<p className="text-sm text-[#222222]">To continue, log in to FundO</p>
					<button className="flex items-center justify-center w-full bg-[#316FF6] border border-[#316FF6] text-white rounded-full py-3.5">
						<img src="/assets/facebook-icon.png" alt="facebook" className="w-5 mr-4" />
						<span className=" text-xs font-medium uppercase">Continue with Facebook</span>
					</button>
					<button className="flex items-center justify-center w-full bg-white text-[#222222] border border-[#222222] rounded-full py-3.5">
						<img src="/assets/google-icon.png" alt="facebook" className="w-5 mr-4" />
						<span className=" text-xs font-medium uppercase">Continue with Google</span>
					</button>
				</div>
				<div className="relative">
					<hr className="my-8 bg-[#777777]" />
					<p className="absolute -top-2 left-1/2 -translate-x-1/2  text-xs uppercase bg-[#F5F5F5] px-3">or</p>
				</div>
				<div className="w-80 mx-auto text-center relative">
					<RegisterForm />
				</div>
				<hr className="my-8 bg-[#777777]" />
				<span className="text-sm">
					Already have an account?{" "}
					<a href="/login" className="underline">
						Login for FundO
					</a>
				</span>
			</div>
		</div>
	);
}
