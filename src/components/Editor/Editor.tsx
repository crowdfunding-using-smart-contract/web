import { useRef, useEffect } from "react";
import EditorJS, { EditorConfig } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Image from "@editorjs/image";
import List from "@editorjs/list";
import Code from "@editorjs/code";
import Quote from "@editorjs/quote";
import Delimiter from "@editorjs/delimiter";
import Table from "@editorjs/table";
import Warning from "@editorjs/warning";
import Checklist from "@editorjs/checklist";
import InlineCode from "@editorjs/inline-code";
import Marker from "@editorjs/marker";
import Underline from "@editorjs/underline";
import Embed from "@editorjs/embed";
import { uploadPostImage } from "@/services/api/forum.api";
import "./style.css";

type EditorProps = {
	data?: string;
	disabled?: boolean;
	onChange?: (content: string) => void;
};

export default function Editor({ disabled = false, data, onChange }: EditorProps) {
	const ejInstance = useRef<EditorJS | null>(null);
	const isPreview = disabled && data !== undefined;

	const initEditor = () => {
		const editorConfig: EditorConfig = {
			holder: "editorjs",
			autofocus: true,
			data: isPreview
				? {
						time: new Date().getTime(),
						blocks: JSON.parse(data),
					}
				: undefined,
			readOnly: disabled,
			onChange: async () => {
				const content = await ejInstance.current?.saver.save();
				console.log(content);
				if (onChange) {
					onChange(JSON.stringify(content?.blocks));
				}
			},
			tools: {
				header: Header,
				image: {
					class: Image,
					config: {
						uploader: {
							async uploadByFile(file: File) {
								const response = await uploadPostImage({ image: file });
								if (response.success === 1) {
									return response;
								}
							},
						},
					},
				},
				list: List,
				code: Code,
				quote: Quote,
				delimiter: Delimiter,
				table: Table,
				warning: Warning,
				checklist: Checklist,
				inlineCode: InlineCode,
				marker: Marker,
				underline: Underline,
				embed: Embed,
			},
		};

		const editor = new EditorJS(editorConfig);

		editor.isReady.then(() => {
			ejInstance.current = editor;
		});
	};

	useEffect(() => {
		if (ejInstance.current === null) {
			initEditor();
		}

		return () => {
			ejInstance?.current?.destroy();
			ejInstance.current = null;
		};
	}, []);

	return <div id="editorjs"></div>;
}
