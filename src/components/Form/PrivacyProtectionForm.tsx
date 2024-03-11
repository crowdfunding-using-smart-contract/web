import { useState } from "react";
import type { FormEvent } from "react";
import useRegisterStore from "@/store/useRegisterStore";

export default function PrivacyProtectionForm() {
	const { setAction } = useRegisterStore();
	const [fields, setFields] = useState({
		first: false,
		second: false,
		third: false,
	});

	const disabledButton = !fields.first || !fields.second;

	function onSubmitHandler(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setAction("personalInformation");
	}

	return (
		<form className="w-96 flex flex-col" onSubmit={onSubmitHandler}>
			<h1 className="text-2xl font-bold">Privacy protection comes first</h1>
			<p className="text-sm">
				Before we can continue, we need your consent to some privacy and security issues. Answers to common questions on
				these topics.
			</p>
			<div className="flex flex-col my-4 gap-y-4">
				<div className="flex items-start">
					<label className="relative flex cursor-pointer items-center rounded-full mr-1">
						<input
							type="checkbox"
							defaultChecked={fields.first}
							onClick={() => setFields({ ...fields, first: !fields.first })}
							className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-indigo-500 checked:bg-indigo-500 checked:before:bg-indigo-500 hover:before:opacity-10"
						/>
						<div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-3 w-3"
								viewBox="0 0 20 20"
								fill="currentColor"
								stroke="currentColor"
								strokeWidth="1"
							>
								<path
									fillRule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clipRule="evenodd"
								></path>
							</svg>
						</div>
					</label>
					<span className="ml-2 text-xs text-font-primary">
						I would like to use the online programme and agree that information on my status may be processed for this
						purpose. I have read the terms of use and privacy policy.*
					</span>
				</div>
				<div className="flex items-start">
					<label className="relative flex cursor-pointer items-center rounded-full mr-1">
						<input
							type="checkbox"
							defaultChecked={fields.second}
							onClick={() => setFields({ ...fields, second: !fields.second })}
							className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-indigo-500 checked:bg-indigo-500 checked:before:bg-indigo-500 hover:before:opacity-10"
						/>
						<div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-3 w-3"
								viewBox="0 0 20 20"
								fill="currentColor"
								stroke="currentColor"
								strokeWidth="1"
							>
								<path
									fillRule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clipRule="evenodd"
								></path>
							</svg>
						</div>
					</label>
					<span className="ml-2 text-xs text-font-primary">
						I have read the instructions for use of the online programme. I am aware that the programme is not intended
						for use the presence of the contraindications described in the instructions for use.*
					</span>
				</div>
				<div className="flex items-start">
					<label className="relative flex cursor-pointer items-center rounded-full mr-1">
						<input
							type="checkbox"
							defaultChecked={fields.third}
							onClick={() => setFields({ ...fields, third: !fields.third })}
							className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-indigo-500 checked:bg-indigo-500 checked:before:bg-indigo-500 hover:before:opacity-10"
						/>
						<div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-3 w-3"
								viewBox="0 0 20 20"
								fill="currentColor"
								stroke="currentColor"
								strokeWidth="1"
							>
								<path
									fillRule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clipRule="evenodd"
								></path>
							</svg>
						</div>
					</label>
					<span className="ml-2 text-xs text-font-primary">
						I consent to my data being processed for the purposes of permanantly ensuring the technical functionality,
						user-friendliness and further development of the online programme.
					</span>
				</div>
			</div>
			<button
				className="py-2 px-10 w-max my-3 rounded-lg shadow-2xl text-sm text-white font-semibold bg-primary opacity-95 hover:opacity-100 duration-200 disabled:bg-gray-500 disabled:opacity-100"
				disabled={disabledButton}
			>
				Agree
			</button>
			<span className="text-xs text-font-primary opacity-45">* These fields must be filled in.</span>
		</form>
	);
}
