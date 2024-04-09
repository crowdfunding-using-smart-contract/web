import { DatePicker, HourPicker, ImagePicker, MinutePicker } from "@/components";
import { dateFormatter } from "@/libs/date";
import { useListProjectCategoryQuery } from "@/services/query/projectCategory.query";
import { Formik, Form, Field } from "formik";
import { CreateProjectFormValues } from "@/types/project";
import { useCreateProjectMutation } from "@/services/query/project.query";
import * as Yup from "yup";
import { Navigate, useNavigate } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";
import { useEffect } from "react";
import { Swal } from "@/libs/sweetalert2";

const CreateProjectSchema = Yup.object().shape({
	title: Yup.string().min(2, "Too Short!").max(70, "Too Long!").required("Required"),
	subTitle: Yup.string().min(2, "Too Short").max(255, "Too Long").required("Required"),
	description: Yup.string().min(2, "Too Short").required("Required"),
	categoryId: Yup.string().required("Required"),
	subCategoryId: Yup.string().required("Required"),
	location: Yup.string().required("Required"),
	image: Yup.mixed().notRequired(),
});

export default function NewProjectPage() {
	const { user } = useAuthStore();
	const { isPending, data: categories } = useListProjectCategoryQuery();
	const { isPending: isLoadingCreateProject, mutateAsync: createProjectAsync } = useCreateProjectMutation();
	const navigate = useNavigate();

	async function onSubmitHandler(values: CreateProjectFormValues) {
		try {
			await createProjectAsync(values);
			navigate("/project", { replace: true });
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		if (user && user.metamaskAccountId === "empty") {
			Swal.fire({
				title: "Unauthorized",
				text: "Please connect your metamask account to continue",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Connect",
				cancelButtonText: "Cancel",
			}).then((result) => {
				if (result.isConfirmed) navigate("/profile");
			});
		}
	}, [user, navigate]);

	if (isPending || !categories) return <div className="pt-32">Loading...</div>;

	if (!user) return <Navigate to="/login" />;

	if (user.metamaskAccountId === "empty") return null;

	const initialValues: CreateProjectFormValues = {
		addressId: user.metamaskAccountId,
		title: "",
		subTitle: "",
		categoryId: "",
		subCategoryId: "",
		location: "",
		image: null,
		description: "",
		targetFunding: "100",
		endDate: null,
	};

	return (
		<Formik initialValues={initialValues} onSubmit={onSubmitHandler} validationSchema={CreateProjectSchema}>
			{({ values, errors, touched, setValues }) => (
				<Form className="max-w-screen-lg mx-auto pt-32 px-4">
					<div className="flex flex-col items-center">
						<h1 className="text-[32px] text-[#222222] mb-3">Start a Project</h1>
						<p className="text-xl text-[#BBBBBB]">Make it easy for people to learn about your project.</p>
					</div>
					<div className="flex flex-col mt-16">
						<h4 className="text-lg font-semibold">Project Title</h4>
						<p className="text-[#797979]">
							Write a clear, brief title and subtitle to help people quickly understand your project. Both will appear
							on your project and pre-launch pages
						</p>
						<h5 className="font-medium mt-3 mb-2">Title</h5>
						<Field
							type="text"
							name="title"
							placeholder="Aloe Bud: Self-care pocket companion for iOS"
							className={`border w-full md:w-3/5 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#5340ff] duration-300 ${errors.title && touched.title ? "ring-2 ring-red-500 focus:ring-red-500" : ""}`}
						/>
						{errors.title && touched.title ? <p className="text-red-500 text-sm mt-1">{errors.title}</p> : null}
						<h5 className="font-medium mt-3 mb-2">Subtitle</h5>
						<Field
							type="text"
							name="subTitle"
							placeholder="Gently~brings awareness to self-care activities, using encouraging push notifications, rather than guilt or shame."
							className={`border w-full px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#5340ff] duration-300 ${errors.subTitle && touched.subTitle ? "ring-2 ring-red-500 focus:ring-red-500" : ""}`}
						/>
						{errors.subTitle && touched.subTitle ? (
							<p className="text-red-500 text-sm mt-1">{errors.subTitle}</p>
						) : null}
					</div>
					<div className="flex flex-col mt-8">
						<h4 className="text-lg font-semibold">Project Description</h4>
						<p className="text-[#797979]">
							Write the clear description that describe what your project working on and target of your project.
						</p>
						<Field
							type="text"
							as="textarea"
							name="description"
							placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
							className={`border w-full mt-3 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#5340ff] duration-300 ${errors.description && touched.description ? "ring-2 ring-red-500 focus:ring-red-500" : ""}`}
						/>
						{errors.description && touched.description ? (
							<p className="text-red-500 text-sm mt-1">{errors.subTitle}</p>
						) : null}
					</div>
					<div className="flex flex-col mt-8">
						<h4 className="text-lg font-semibold">Project Category</h4>
						<p className="text-[#797979]">Enter the location that best describes where your project is based.</p>
						<div className="flex flex-col md:flex-row mt-3 w-full gap-x-8 gap-y-4">
							<div className="flex-1 flex flex-col">
								<h5 className="font-medium mb-2">Category</h5>
								<div className="border">
									<Field name="categoryId" as="select" className="w-full p-2">
										<option value="" disabled>
											Category
										</option>
										{categories.map((item) => (
											<option key={item.id} value={item.id}>
												{item.name}
											</option>
										))}
									</Field>
								</div>
								{errors.categoryId && touched.categoryId ? (
									<p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>
								) : null}
							</div>
							<div className="flex-1 flex flex-col">
								<h5 className="font-medium mb-2">Subcategory</h5>
								<div className="border">
									<Field name="subCategoryId" as="select" className="w-full p-2" disabled={values.categoryId === ""}>
										<option value="" disabled>
											Subcategory
										</option>
										{categories
											.find((item) => item.id === values.categoryId)
											?.subcategories.map((s) => (
												<option key={s.id} value={s.id}>
													{s.name}
												</option>
											))}
									</Field>
								</div>
								{errors.subCategoryId && touched.subCategoryId ? (
									<p className="text-red-500 text-sm mt-1">{errors.subCategoryId}</p>
								) : null}
							</div>
						</div>
					</div>
					<div className="flex flex-col mt-8">
						<h4 className="text-lg font-semibold">Project Location</h4>
						<p className="text-[#797979]">Enter the location that best describes where your project is based.</p>
						<Field
							type="text"
							name="location"
							placeholder="Bangkok, Thailand"
							className={`border w-full md:w-1/2 mt-3 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#5340ff] duration-300 ${errors.location && touched.location ? "ring-2 ring-red-500 focus:ring-red-500" : ""}`}
						/>
						{errors.location && touched.location ? (
							<p className="text-red-500 text-sm mt-1">{errors.location}</p>
						) : null}
					</div>
					<div className="flex flex-col mt-8">
						<h4 className="text-lg font-semibold">Project Image</h4>
						<p className="text-[#797979]">
							Add an image that clearly represents your project. Choose one that looks good at different sizes—it’ll
							appear on your project page, across the website, and (when shared) on social channels.
						</p>
						<p className="text-[#797979] mt-2">
							Your image should be at least 1024x576 pixels. It will be cropped to a 16:9 ratio.
						</p>
						<div className="aspect-video w-full lg:w-1/2 mt-8">
							<ImagePicker label={"project"} action={(file) => setValues({ ...values, image: file })} />
						</div>
					</div>
					<div className="flex flex-col mt-8">
						<h4 className="text-lg font-semibold">Project's Campaign Duration</h4>
						<p className="text-[#797979]">
							Set a time limit for your campaign. You won’t be able to change this after you launch.
						</p>
						<div className="flex gap-x-2 items-end mt-3">
							<div className="flex flex-col">
								<span className="text-sm">Month</span>
								<span className="border px-4 py-3">{dateFormatter(values.endDate, "MMMM")}</span>
							</div>
							<div className="flex flex-col">
								<span className="text-sm">Day</span>
								<span className="border px-4 py-3">{dateFormatter(values.endDate, "D")}</span>
							</div>
							<div className="flex flex-col">
								<span className="text-sm">Year</span>
								<span className="border px-4 py-3">{dateFormatter(values.endDate, "YYYY")}</span>
							</div>
							<DatePicker value={values.endDate} setValue={(date) => setValues({ ...values, endDate: date })} />
						</div>
						<div className="flex flex-col gap-x-2 mt-3">
							<span className="text-sm">Time</span>
							<div className="flex">
								<HourPicker
									disabled={!values.endDate}
									value={values.endDate?.getHours()}
									setValue={(hour) => {
										const date = values.endDate;
										if (!date) return;
										date.setHours(hour);
										setValues({ ...values, endDate: date });
									}}
								/>
								<span className="px-2 py-3">:</span>
								<MinutePicker
									disabled={!values.endDate}
									value={values.endDate?.getMinutes()}
									setValue={(hour) => {
										const date = values.endDate;
										if (!date) return;
										date.setMinutes(hour);
										setValues({ ...values, endDate: date });
									}}
								/>
							</div>
						</div>
						<div className="flex mt-8 mb-24">
							<button
								type="submit"
								className="py-3 w-full mt-3 rounded-md shadow-2xl text-sm text-white font-semibold bg-primary opacity-95 hover:opacity-100"
							>
								Create Project
								{isLoadingCreateProject ? "..." : ""}
							</button>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
}
