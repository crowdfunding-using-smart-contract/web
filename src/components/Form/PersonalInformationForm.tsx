// import { DateInput } from "@mantine/dates";
// import { Select } from "@mantine/core";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { DateInput } from "@mantine/dates";
import { Select } from "@mantine/core";
import { genderOptions } from "@/constants/gender";
// import type { RegisterPayload } from "@/types/auth";
import { ErrorFields } from "@/types/error";
import useRegisterStore from "@/store/useRegisterStore";
import dayjs from "dayjs";

type PersonalInformationFormValues = {
	firstname: string;
	lastname: string;
	birthdate: Date | null;
	gender: "M" | "F" | "NA" | null;
};

export default function PersonalInformationForm() {
	const { setPayload } = useRegisterStore();

	const initialValues: PersonalInformationFormValues = {
		firstname: "",
		lastname: "",
		birthdate: null,
		gender: null,
	};

	function onSubmitHandler(
		values: PersonalInformationFormValues,
		formikHelpers: FormikHelpers<PersonalInformationFormValues>,
	) {
		const errors: ErrorFields<PersonalInformationFormValues>[] = [];
		if (!values.firstname) errors.push({ field: "firstname", message: "Firstname is required" });
		if (!values.lastname) errors.push({ field: "lastname", message: "Lastname is required" });

		const today = dayjs();

		if (!values.birthdate) {
			errors.push({ field: "birthdate", message: "Birthdate is required" });
		} else if (today.isBefore(dayjs(values.birthdate), "day")) {
			errors.push({ field: "birthdate", message: "Birthdate cannot be in the future" });
		} else if (today.diff(dayjs(values.birthdate), "year") <= 18) {
			// TODO: Also check comparing months and days
			errors.push({ field: "birthdate", message: "You must be at least 18 years old" });
		}

		if (!values.gender) errors.push({ field: "gender", message: "Gender is required" });

		if (errors.length > 0) {
			errors.forEach((error) => {
				formikHelpers.setFieldError(error.field, error.message);
			});
			return;
		}

		if (!values.birthdate) {
			formikHelpers.setFieldError("birthdate", "Birthdate is required");
			return;
		}

		if (!values.gender) {
			formikHelpers.setFieldError("gender", "Gender is required");
			return;
		}

		setPayload("firstname", values.firstname);
		setPayload("lastname", values.lastname);
		setPayload("birthdate", values.birthdate.toISOString());
		setPayload("gender", values.gender);
	}

	return (
		<Formik initialValues={initialValues} onSubmit={onSubmitHandler}>
			{({ values, errors, setValues }) => (
				<Form className="w-full sm:w-96 flex flex-col text-font-primary">
					<h1 className="text-2xl font-bold">We're glad you're here</h1>
					<p className="text-sm">
						Now we would like to get to know you a little bit better. Please fill in the following fields to continue
						your journey.
					</p>
					<div className="text-sm mt-6 my-1.5">
						<Field
							type="text"
							name="firstname"
							placeholder="Firstname"
							className={`w-full border rounded-lg p-3 focus:outline-primary ${errors.firstname ? "border-red-300 focus:outline-red-300" : ""}`}
						/>
						{errors.firstname && <div className="text-red-500 text-xs">{errors.firstname}</div>}
					</div>
					<div className="text-sm my-1.5">
						<Field
							type="text"
							name="lastname"
							placeholder="Lastname"
							className={`w-full border rounded-lg p-3 focus:outline-primary ${errors.lastname ? "border-red-300 focus:outline-red-300" : ""}`}
						/>
						{errors.lastname && <div className="text-red-500 text-xs">{errors.lastname}</div>}
					</div>
					<div className="my-1.5">
						<DateInput
							placeholder={"Birthday"}
							valueFormat="DD/MM/YYYY"
							styles={{
								input: {
									borderRadius: 8,
									fontSize: "0.875rem",
									padding: "1.325rem 0.75rem",
									border: "1px solid #cbd5e1",
									"&:focus": {
										borderColor: "#2563EB",
									},
								},
							}}
							value={values.birthdate}
							onChange={(date) => setValues({ ...values, birthdate: date })}
						/>
						{errors.birthdate && <div className="text-red-500 text-xs">{errors.birthdate}</div>}
					</div>
					<div className="my-1.5">
						<Select
							placeholder={"Gender"}
							data={genderOptions}
							styles={{
								input: {
									borderRadius: 8,
									fontSize: "0.875rem",
									padding: "1.325rem 0.75rem",
									border: "1px solid #cbd5e1",
									"&:focus": {
										borderColor: "#2563EB",
									},
								},
							}}
							value={values.gender}
							onChange={(gender) => setValues({ ...values, gender: gender as (typeof values)["gender"] })}
						/>
						{errors.gender && <div className="text-red-500 text-xs">{errors.gender}</div>}
					</div>
					<button className="py-2 px-8 w-max mt-8 rounded-lg shadow-2xl text-sm text-white font-semibold bg-primary opacity-95 hover:opacity-100">
						Continue
					</button>
				</Form>
			)}
		</Formik>
	);
}
