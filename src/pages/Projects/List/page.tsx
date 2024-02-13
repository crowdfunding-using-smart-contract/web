import { useListProjectCategoryQuery } from "@/services/query/projectCategory.query";
import { ComboboxItem, Select } from "@mantine/core";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useSearchParams } from "react-router-dom";

export default function ProjectList() {
	const { isPending, data: categories } = useListProjectCategoryQuery();
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

	function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
		setSearchQuery(e.target.value);
	}

	function onSubmitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		searchParams.set("q", searchQuery);
		setSearchParams(searchParams);
	}

	function onChangeCategoryHandler(options: ComboboxItem) {
		if (!options) {
			setSelectedCategory(null);
			setSelectedSubcategory(null);
			searchParams.delete("category");
			searchParams.delete("subcategory");
			setSearchParams(searchParams);
			return;
		}

		setSelectedCategory(options.value);
		setSelectedSubcategory(null);
		searchParams.set("category", options.value);
		searchParams.delete("subcategory");
		setSearchParams(searchParams);
	}

	function onChangeSubcategoryHandler(options: ComboboxItem) {
		if (!options) {
			setSelectedSubcategory(null);
			searchParams.delete("subcategory");
			setSearchParams(searchParams);
			return;
		}

		setSelectedSubcategory(options.value);
		searchParams.set("subcategory", options.value);
		setSearchParams(searchParams);
	}

	useEffect(() => {
		setSearchQuery(searchParams.get("q") || "");
		setSelectedCategory(searchParams.get("category") || null);
		setSelectedSubcategory(searchParams.get("subcategory") || null);
	}, [searchParams]);

	useEffect(() => {
		if (searchQuery === "") {
			searchParams.delete("q");
			setSearchParams(searchParams);
		}
	}, [searchParams, searchQuery, setSearchParams]);

	if (isPending || !categories) {
		return <div>Loading...</div>;
	}

	return (
		<div className="pt-[70px] max-w-screen-xl mx-auto">
			<div className="py-16 px-2 flex">
				<form onSubmit={onSubmitHandler}>
					<div className="flex items-center w-[450px] px-2 bg-white border border-[#ced4da] rounded">
						<IoMdSearch />
						<input
							type="search"
							placeholder="Enter your interest projects"
							value={searchQuery}
							onChange={onChangeHandler}
							className="w-full px-2 py-[0.45rem] text-sm bg-white text-[#222222] focus:outline-none"
						/>
					</div>
				</form>
				<Select
					placeholder="Category"
					data={categories.map((item) => ({ value: item.id, label: item.name }))}
					withCheckIcon={false}
					searchable
					nothingFoundMessage="Nothing found..."
					comboboxProps={{ transitionProps: { transition: "pop", duration: 200 } }}
					value={selectedCategory}
					onChange={(_value, options) => onChangeCategoryHandler(options)}
					className="ml-4"
				/>

				<Select
					placeholder="Subcategory"
					data={categories
						?.find((item) => item.id === selectedCategory)
						?.subcategories.map((s) => ({ ...s, value: s.id, label: s.name }))}
					withCheckIcon={false}
					searchable
					nothingFoundMessage="Nothing found..."
					comboboxProps={{ transitionProps: { transition: "pop", duration: 200 } }}
					disabled={!selectedCategory}
					value={selectedSubcategory}
					onChange={(_value, options) => onChangeSubcategoryHandler(options)}
					className="ml-4"
				/>
			</div>
		</div>
	);
}
