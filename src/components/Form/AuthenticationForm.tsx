import { Field, Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import useRegisterStore from "@/store/useRegisterStore";
import type { RegisterPayload } from "@/types/auth";
import type { ErrorFields } from "@/types/error";

type AuthenticationFormValues = Pick<RegisterPayload, "email" | "password" | "passwordConfirmation">;

export default function AuthenticationForm() {
	const { setAction, setPayload } = useRegisterStore();

	const initialValues: AuthenticationFormValues = {
		email: "",
		password: "",
		passwordConfirmation: "",
	};

	function onSubmitHandler(values: AuthenticationFormValues, formikHelpers: FormikHelpers<AuthenticationFormValues>) {
		const errors: ErrorFields<AuthenticationFormValues>[] = [];
		if (!values.email) errors.push({ field: "email", message: "Email is required" });
		if (!values.password) errors.push({ field: "password", message: "Password is required" });
		if (!values.passwordConfirmation) {
			errors.push({ field: "passwordConfirmation", message: "Password confirmation is required" });
		} else if (values.password !== values.passwordConfirmation) {
			errors.push({ field: "passwordConfirmation", message: "Passwords do not match" });
		}

		if (errors.length > 0) {
			errors.forEach((error) => {
				formikHelpers.setFieldError(error.field, error.message);
			});
			return;
		}

		setPayload("email", values.email);
		setPayload("password", values.password);
		setPayload("passwordConfirmation", values.passwordConfirmation);
		setAction("privacyProtection");
	}

	return (
		<Formik initialValues={initialValues} onSubmit={onSubmitHandler}>
			{({ errors }) => (
				<Form className="w-96 flex flex-col">
					<h1 className="text-2xl font-bold">Your journey to better mental health starts here</h1>
					<p className="text-sm">
						You're in good hands, we've already helped many people understand and improve their mental health. To get
						started, enter your details below.
					</p>
					<div className="text-sm mt-4 my-1">
						<Field
							type="text"
							name="email"
							placeholder="Email"
							className={`w-full border rounded-lg p-3 focus:outline-primary ${errors.email ? "border-red-300 focus:outline-red-300" : ""}`}
						/>
						{errors.email && <div className="text-red-500 text-xs">{errors.email}</div>}
					</div>
					<div className="text-sm my-1">
						<Field
							type="password"
							name="password"
							placeholder="Password"
							className={`w-full border rounded-lg p-3 focus:outline-primary focus:border-primary ${errors.password ? "border-red-300 focus:outline-red-300" : ""}`}
						/>
						{errors.password && <div className="text-red-500 text-xs">{errors.password}</div>}
					</div>
					<div className="text-sm mb-4 my-1">
						<Field
							type="password"
							name="passwordConfirmation"
							placeholder="Confirm Password"
							className={`w-full border rounded-lg p-3 focus:outline-primary focus:border-primary ${errors.passwordConfirmation ? "border-red-300 focus:outline-red-300" : ""}`}
						/>
						{errors.passwordConfirmation && <div className="text-red-500 text-xs">{errors.passwordConfirmation}</div>}
					</div>
					<button
						type="submit"
						className="py-2 px-8 w-max mt-3 rounded-lg shadow-2xl text-sm text-white font-semibold bg-primary opacity-95 hover:opacity-100"
					>
						Continue Registration
					</button>
					<span></span>
					<Link to="/login" className="text-xs font-semibold mt-2 text-primary text-opacity-85">
						You already have a FundO account?
					</Link>
				</Form>
			)}
		</Formik>
	);
}
