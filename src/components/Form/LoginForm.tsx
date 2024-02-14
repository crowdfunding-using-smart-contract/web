import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useAuthLoginMutation } from "@/services/query/auth.query";
import type { LoginPayload } from "@/types/auth";
import useAuthStore from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";

const loginSchema = Yup.object().shape({
	email: Yup.string().email("อีเมลไม่ถูกต้อง").required("กรุณากรอกอีเมล"),
	password: Yup.string().min(6, "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร").required("กรุณากรอกรหัสผ่าน"),
});

export default function LoginForm() {
	const { isPending, mutateAsync: login } = useAuthLoginMutation();
	const { setIsAuthenticated, setUser } = useAuthStore();
	const navigate = useNavigate();

	const initialValues: LoginPayload = { email: "", password: "" };

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={loginSchema}
			onSubmit={async (values, { setSubmitting }) => {
				try {
					const res = await login(values);
					setIsAuthenticated(true);
					setUser(res.user);
					setSubmitting(false);
					navigate("/");
				} catch (error) {
					console.error("Fetch login error", error);
				}
			}}
		>
			{({ isSubmitting }) => (
				<Form className="flex flex-col text-gray-700">
					<LoginFormField type={"email"} icon={<EnvelopeIcon className="w-4 h-4 inline-block mr-2 text-gray-400" />} />
					<LoginFormField
						type={"password"}
						icon={<LockClosedIcon className="w-4 h-4 inline-block mr-2 text-gray-400" />}
					/>
					<button
						type="submit"
						disabled={isSubmitting}
						className="bg-[#5340FF] text-white font-medium rounded-full py-3 my-4"
					>
						{!isPending ? "LOGIN" : "Loading..."}
					</button>
				</Form>
			)}
		</Formik>
	);
}

type LoginFormFieldProps = {
	type: string;
	icon: React.ReactNode;
};

function LoginFormField({ type, icon }: LoginFormFieldProps) {
	return (
		<div className="my-2 text-left">
			<label htmlFor={type} className="text-md font-medium">
				{type.charAt(0).toUpperCase() + type.slice(1)}
			</label>
			<div className="flex items-center border border-gray-300 rounded px-3">
				{icon}
				<Field
					type={type}
					name={type}
					placeholder={`Type your ${type}`}
					className="outline-none bg-[#F5F5F5] px py-3 flex-1"
				/>
			</div>
			<ErrorMessage name={type} component="div" />
		</div>
	);
}
