import { Formik, Form, Field, FormikHelpers } from "formik";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import type { RegisterPayload } from "@/types/auth";
import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useAuthRegisterMutation } from "@/services/query/auth.query";
import useAuthStore from "@/store/useAuthStore";

type ErrorFields = {
	field: string;
	message: string;
};

export default function RegisterForm() {
	const { isPending, mutateAsync: register } = useAuthRegisterMutation();
	const { setIsAuthenticated } = useAuthStore();
	const [currentSection, setCurrentSection] = useState(1);

	const initialValues: RegisterPayload = {
		firstname: "",
		lastname: "",
		phoneNumber: "",
		email: "",
		password: "",
		passwordConfirmation: "",
	};

	function validatePersonalValues(values: RegisterPayload): ErrorFields[] {
		const errors: ErrorFields[] = [];
		if (!values.firstname) errors.push({ field: "firstname", message: "กรุณากรอกชื่อ" });
		if (!values.lastname) errors.push({ field: "lastname", message: "กรุณากรอกนามสกุล" });
		if (!values.phoneNumber) {
			errors.push({ field: "phoneNumber", message: "กรุณากรอกเบอร์โทรศัพท์" });
		} else if (values.phoneNumber.length < 10) {
			errors.push({ field: "phoneNumber", message: "เบอร์โทรศัพท์ไม่ถูกต้อง" });
		}
		return errors;
	}

	function validateAuthValues(values: RegisterPayload): ErrorFields[] {
		const errors: ErrorFields[] = [];
		if (!values.email) errors.push({ field: "email", message: "กรุณากรอกอีเมล" });
		if (!values.password) errors.push({ field: "password", message: "กรุณากรอกรหัสผ่าน" });
		if (!values.passwordConfirmation) {
			errors.push({ field: "passwordConfirmation", message: "กรุณายืนยันรหัสผ่าน" });
		} else if (values.password !== values.passwordConfirmation) {
			errors.push({ field: "passwordConfirmation", message: "รหัสผ่านไม่ตรงกัน" });
		}
		return errors;
	}

	async function onSubmitHandler(values: RegisterPayload, formikHelpers: FormikHelpers<RegisterPayload>) {
		if (currentSection === 1) {
			const errors = validatePersonalValues(values);

			if (errors.length > 0) {
				errors.forEach((error) => {
					formikHelpers.setFieldError(error.field, error.message);
				});
				return;
			}

			setCurrentSection(2);
			return;
		}

		const errors = validateAuthValues(values);
		if (errors.length > 0) {
			errors.forEach((error) => {
				formikHelpers.setFieldError(error.field, error.message);
			});
			return;
		}

		try {
			const res = await register(values);
			console.log(res);
			formikHelpers.setSubmitting(true);
			setIsAuthenticated(true);
		} catch (error) {
			console.error("Fetch register error", error);
		}
	}

	return (
		<Formik initialValues={initialValues} onSubmit={onSubmitHandler}>
			{({ isSubmitting, errors }) => (
				<Form className="block overflow-hidden text-gray-700">
					<div className={`inline-flex duration-150 ${currentSection === 2 ? "-translate-x-1/2" : ""}`}>
						<div className="w-80">
							<RegisterFormField
								type={"string"}
								name={"firstname"}
								error={errors.firstname}
								icon={<LockClosedIcon className="w-4 h-4 inline-block mr-2 text-gray-400" />}
							/>
							<RegisterFormField
								type={"string"}
								name={"lastname"}
								error={errors.lastname}
								icon={<LockClosedIcon className="w-4 h-4 inline-block mr-2 text-gray-400" />}
							/>
							<RegisterFormField
								type={"string"}
								name={"phoneNumber"}
								label={"Phone number"}
								placeholder="Type your phone number"
								error={errors.phoneNumber}
								icon={<EnvelopeIcon className="w-4 h-4 inline-block mr-2 text-gray-400" />}
							/>
						</div>
						<div className="w-80">
							<RegisterFormField
								type={"email"}
								name={"email"}
								error={errors.email}
								icon={<EnvelopeIcon className="w-4 h-4 inline-block mr-2 text-gray-400" />}
							/>
							<RegisterFormField
								type={"password"}
								name={"password"}
								error={errors.password}
								icon={<LockClosedIcon className="w-4 h-4 inline-block mr-2 text-gray-400" />}
							/>
							<RegisterFormField
								type={"password"}
								name={"passwordConfirmation"}
								label={"Confirm password"}
								placeholder={"Type your password again"}
								error={errors.passwordConfirmation}
								icon={<LockClosedIcon className="w-4 h-4 inline-block mr-2 text-gray-400" />}
							/>
						</div>
					</div>

					<button
						type="submit"
						disabled={isSubmitting}
						className="bg-[#5340FF] text-white font-medium rounded-full py-3 my-4 w-full"
					>
						{currentSection === 1 ? (
							<FaArrowRightLong className="w-5 h-5 inline-block" />
						) : isPending ? (
							"Loading..."
						) : (
							"REGISTER"
						)}
					</button>
				</Form>
			)}
		</Formik>
	);
}

type RegisterFormFieldProps = {
	type: string;
	name: string;
	label?: string;
	placeholder?: string;
	error: string | undefined;
	icon: React.ReactNode;
};

function RegisterFormField({ type, name, label, placeholder, error, icon }: RegisterFormFieldProps) {
	return (
		<div className="my-2 text-left">
			<label htmlFor={name} className="text-md font-medium">
				{label || name.charAt(0).toUpperCase() + name.slice(1)}
			</label>
			<div className={`flex items-center border border-gray-300 rounded px-3 ${error ? "border-red-500" : ""}`}>
				{icon}
				<Field
					type={type}
					name={name}
					placeholder={placeholder || `Type your ${name}`}
					className="outline-none bg-[#F5F5F5] px py-3 flex-1"
				/>
			</div>
			{error && <div className="text-red-500 text-xs">{error}</div>}
		</div>
	);
}
