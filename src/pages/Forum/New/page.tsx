import { Field, Form, Formik } from "formik";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import * as Yup from "yup";
import type { CreatePostPayload } from "@/types/forum";
import { useGetOwnProjectsQuery } from "@/services/query/project.query";
import { useCreatePostMutation } from "@/services/query/forum.query";

const CreatePostSchema = Yup.object().shape({
	projectId: Yup.string().required("Required"),
	title: Yup.string().min(2, "Too Short!").max(70, "Too Long!").required("Required"),
	description: Yup.string().min(2, "Too Short").required("Required"),
	content: Yup.string(),
});

export default function NewForumPage() {
	const editor = useCreateBlockNote();
	const { isPending: fetchingProjects, data: projects } = useGetOwnProjectsQuery();
	const { isPending: creatingPost, mutateAsync: createPostAsync } = useCreatePostMutation();

	if (fetchingProjects || !projects) return <div className="pt-44">Loading...</div>;

	const initialValues: CreatePostPayload = {
		projectId: "",
		title: "",
		description: "",
		content: "",
	};

	async function onSubmitHandler(values: CreatePostPayload) {
		try {
			await createPostAsync(values);
		} catch (error) {
			console.error("Error creating post", error);
		}
	}

	return (
		<Formik initialValues={initialValues} onSubmit={onSubmitHandler} validationSchema={CreatePostSchema}>
			{({ values, errors, touched, setValues }) => (
				<Form className="max-w-screen-lg mx-auto pt-32 px-4">
					<div className="flex flex-col items-center">
						<h1 className="text-[32px] text-[#222222] mb-3">Start a Forum</h1>
						<p className="text-xl text-[#BBBBBB]">Make it easy for people to learn about your forum.</p>
					</div>
					<div className="flex flex-col mt-8">
						<h4 className="text-lg font-semibold">Post of Project</h4>
						{/* TODO: Change explanation of post of project */}
						<p className="text-[#797979]">Enter the location that best describes where your project is based.</p>
						<div className="border md:w-1/2 w-full mt-3">
							<Field name="projectId" as="select" className="w-full p-1.5">
								<option value="" disabled>
									Project
								</option>
								{projects.map((p) => (
									<option key={p.id} value={p.id}>
										{p.title}
									</option>
								))}
							</Field>
						</div>
						{errors.projectId && touched.projectId ? (
							<p className="text-red-500 text-sm mt-1">{errors.projectId}</p>
						) : null}
					</div>
					<div className="flex flex-col mt-8">
						<h4 className="text-lg font-semibold">Post Title</h4>
						{/* TODO: Change explanation of post title and title input placeholder */}
						<p className="text-[#797979]">Enter the location that best describes where your project is based.</p>
						<Field
							type="text"
							name="title"
							placeholder="Aloe Bud: Self-care pocket companion for iOS"
							className={`border w-full md:w-1/2 mt-3 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#5340ff] duration-300 ${errors.title && touched.title ? "ring-2 ring-red-500 focus:ring-red-500" : ""}`}
						/>
						{errors.title && touched.title ? <p className="text-red-500 text-sm mt-1">{errors.title}</p> : null}
					</div>

					<div className="flex flex-col mt-8">
						<h4 className="text-lg font-semibold">Post Description</h4>
						{/* TODO: Change explanation of post description and description input placeholder */}
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
							<p className="text-red-500 text-sm mt-1">{errors.description}</p>
						) : null}
					</div>
					<div className="flex flex-col mt-8">
						<h4 className="text-lg font-semibold">Post Content</h4>
						{/* TODO: Change explanation of post content */}
						<p className="text-[#797979]">
							Write the clear description that describe what your project working on and target of your project.
						</p>
						<div className="border mt-3 py-5">
							<BlockNoteView
								editor={editor}
								onChange={() => setValues({ ...values, content: JSON.stringify(editor.document) })}
							/>
						</div>
					</div>
					<div className="flex mt-8 mb-24">
						<button
							type="submit"
							disabled={creatingPost}
							className="py-3 w-full mt-3 rounded-md shadow-2xl text-sm text-white font-semibold bg-primary opacity-95 hover:opacity-100"
						>
							{creatingPost ? "Creating Post..." : "Create Post"}
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
}
