import { LanguagePicker, RegisterFormV2 } from "@/components";
import useRegisterStore from "@/store/useRegisterStore";
import { Carousel } from "@mantine/carousel";

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
							<RegisterFormV2 />
						</div>
						{action === "authentication" && <LanguagePicker />}
					</div>
				</div>
				<div className="flex-1 hidden lg:block">
					<Carousel
						withControls={false}
						className="h-full"
						onSlideChange={(index) => console.log(index)}
						styles={{
							viewport: {
								height: "100%",
							},
							container: {
								height: "100%",
							},
						}}
					>
						<Carousel.Slide>
							<img
								src="https://imgix.bustle.com/uploads/image/2020/3/3/ad0ffa5f-d05e-4db0-b69e-a0ae3778eb9b-gettyimages-1135481871.jpg"
								className="object-cover w-full h-full rounded-2xl"
							/>
						</Carousel.Slide>
						<Carousel.Slide>
							<img
								src="https://imgix.bustle.com/uploads/image/2020/3/3/ad0ffa5f-d05e-4db0-b69e-a0ae3778eb9b-gettyimages-1135481871.jpg"
								className="object-cover w-full h-full rounded-2xl"
							/>
						</Carousel.Slide>
						<Carousel.Slide>
							<img
								src="https://imgix.bustle.com/uploads/image/2020/3/3/ad0ffa5f-d05e-4db0-b69e-a0ae3778eb9b-gettyimages-1135481871.jpg"
								className="object-cover w-full h-full rounded-2xl"
							/>
						</Carousel.Slide>
					</Carousel>
				</div>
			</div>
		</div>
	);
}

// export default function RegisterPage() {
// 	return (
// 		<div className="w-screen min-h-screen h-full relative bg-[#3E3E3E]">
// 			<div className="max-w-screen-md w-11/12 md:w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F5F5F5] text-center pt-12 px-0 md:px-32 pb-8 rounded-lg">
// 				<img src="/assets/FundO.png" alt="FundO" className="w-48 mx-auto" />
// 				<hr className="my-8 bg-[#777777]" />
// 				<div className="w-80 flex flex-col mx-auto text-center gap-y-4">
// 					<p className="text-sm text-[#222222]">To continue, log in to FundO</p>
// 					<button className="flex items-center justify-center w-full bg-[#316FF6] border border-[#316FF6] text-white rounded-full py-3.5">
// 						<img src="/assets/facebook-icon.png" alt="facebook" className="w-5 mr-4" />
// 						<span className=" text-xs font-medium uppercase">Continue with Facebook</span>
// 					</button>
// 					<button className="flex items-center justify-center w-full bg-white text-[#222222] border border-[#222222] rounded-full py-3.5">
// 						<img src="/assets/google-icon.png" alt="facebook" className="w-5 mr-4" />
// 						<span className=" text-xs font-medium uppercase">Continue with Google</span>
// 					</button>
// 				</div>
// 				<div className="relative">
// 					<hr className="my-8 bg-[#777777]" />
// 					<p className="absolute -top-2 left-1/2 -translate-x-1/2  text-xs uppercase bg-[#F5F5F5] px-3">or</p>
// 				</div>
// 				<div className="w-80 mx-auto text-center relative">
// 					<RegisterForm />
// 				</div>
// 				<hr className="my-8 bg-[#777777]" />
// 				<span className="text-sm">
// 					Already have an account?{" "}
// 					<a href="/login" className="underline">
// 						Login for FundO
// 					</a>
// 				</span>
// 			</div>
// 		</div>
// 	);
// }
