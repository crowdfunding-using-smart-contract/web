import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useAuthLoginMutation } from "@/services/query/auth.query";
import type { LoginPayload } from "@/types/auth";

const loginSchema = Yup.object().shape({
	email: Yup.string().email("อีเมลไม่ถูกต้อง").required("กรุณากรอกอีเมล"),
	password: Yup.string().min(6, "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร").required("กรุณากรอกรหัสผ่าน"),
});

export default function LoginForm() {
	const { isPending, mutateAsync: login } = useAuthLoginMutation();

	const initialValues: LoginPayload = { email: "", password: "" };

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={loginSchema}
			onSubmit={async (values, { setSubmitting }) => {
				const res = await login(values);
				console.log(res);
				setSubmitting(false);
			}}
		>
			{({ isSubmitting }) => (
				<Form className="flex flex-col text-gray-700">
					<LoginFormField type={"email"} icon={<EnvelopeIcon className="w-4 h-4 inline-block mr-2 text-gray-400" />} />
					<LoginFormField
						type={"password"}
						icon={<LockClosedIcon className="w-4 h-4 inline-block mr-2 text-gray-400" />}
					/>
					<button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white rounded-full py-2 my-4">
						{!isPending ? "Submit" : "Loading..."}
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
		<div className="my-2">
			<label htmlFor={type} className="text-sm">
				{type.charAt(0).toUpperCase() + type.slice(1)}
			</label>
			<div className="flex items-center border-b border-b-gray-300 pb-1.5">
				{icon}
				<Field type={type} name={type} placeholder={`Type your ${type}`} className="outline-none flex-1" />
			</div>
			<ErrorMessage name={type} component="div" />
		</div>
	);
}
