import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";

export default function NewForumPage() {
	// const editor = useCreateBlockNote();
	const editor = useCreateBlockNote({
		initialContent: [
			{
				type: "paragraph",
				content: "Welcome to this demo!",
			},
			{
				type: "paragraph",
			},
			{
				type: "paragraph",
				content: [
					{
						type: "text",
						text: "Blocks:",
						styles: { bold: true },
					},
				],
			},
			{
				type: "paragraph",
				content: "Paragraph",
			},
			{
				type: "heading",
				content: "Heading",
			},
			{
				type: "bulletListItem",
				content: "Bullet List Item",
			},
			{
				type: "numberedListItem",
				content: "Numbered List Item",
			},
			{
				type: "image",
			},
			{
				type: "table",
				content: {
					type: "tableContent",
					rows: [
						{
							cells: ["Table Cell", "Table Cell", "Table Cell"],
						},
						{
							cells: ["Table Cell", "Table Cell", "Table Cell"],
						},
						{
							cells: ["Table Cell", "Table Cell", "Table Cell"],
						},
					],
				},
			},
			{
				type: "paragraph",
			},
			{
				type: "paragraph",
				content: [
					{
						type: "text",
						text: "Inline Content:",
						styles: { bold: true },
					},
				],
			},
			{
				type: "paragraph",
				content: [
					{
						type: "text",
						text: "Styled Text",
						styles: {
							bold: true,
							italic: true,
							textColor: "red",
							backgroundColor: "blue",
						},
					},
					{
						type: "text",
						text: " ",
						styles: {},
					},
					{
						type: "link",
						content: "Link",
						href: "https://www.blocknotejs.org",
					},
				],
			},
			{
				type: "paragraph",
			},
		],
	});

	return (
		<div className="max-w-screen-lg mx-auto pt-32 px-4">
			<div className="flex flex-col items-center">
				<h1 className="text-[32px] text-[#222222] mb-3">Start a Forum</h1>
				<p className="text-xl text-[#BBBBBB]">Make it easy for people to learn about your forum.</p>
			</div>

			<div className="flex flex-col mt-16">
				<h5 className="font-medium mt-3 mb-2">Title</h5>
				<input
					type="text"
					placeholder="Aloe Bud: Self-care pocket companion for iOS"
					className="border rounded-lg w-full md:w-3/5 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#5340ff] duration-300"
				/>
				<h5 className="font-medium mt-3 mb-2">Content</h5>
				<div className="flex bg-gray-700 rounded-t-lg h-5">
					<div className="flex items-center ml-1.5 gap-x-1.5">
						<div className="w-3 h-3 rounded-full bg-red-500"></div>
						<div className="w-3 h-3 rounded-full bg-yellow-500"></div>
						<div className="w-3 h-3 rounded-full bg-green-500"></div>
					</div>
				</div>
				<div className="border-2 border-gray-700 rounded-b-lg p-2">
					<BlockNoteView editor={editor} onChange={() => console.log(editor.document)} />
				</div>
			</div>
		</div>
	);
}
