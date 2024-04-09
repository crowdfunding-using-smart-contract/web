import { ProjectCard } from "@/components";
import { useListProjectsQuery } from "@/services/query/project.query";
import { useListProjectCategoryQuery } from "@/services/query/projectCategory.query";
import { ComboboxItem, Pagination, Select } from "@mantine/core";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useSearchParams } from "react-router-dom";

export default function ProjectList() {
	const { isPending: fetchingProjectCategories, data: categories } = useListProjectCategoryQuery();
	const [searchParams, setSearchParams] = useSearchParams();
	const [page, setPage] = useState<number>(parseInt(searchParams.get("page") || "1", 10));
	const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
	const {
		isPending: fetchingProjects,
		data: projects,
		refetch: refetchProjects,
	} = useListProjectsQuery({
		page,
		size: 10,
		q: searchParams.get("q") || "",
		category: selectedCategory!,
		subcategory: selectedSubcategory!,
	});

	function onSubmitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		searchParams.set("q", searchQuery);
		setSearchParams(searchParams);
	}

	function onChangeSearchHandler(e: ChangeEvent<HTMLInputElement>) {
		setSearchQuery(e.target.value);
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

	function onChangePageHandler(page: number) {
		setPage(page);
		searchParams.set("page", page.toString());
		setSearchParams(searchParams);
	}

	useEffect(() => {
		setSearchQuery(searchParams.get("q") || "");
		setSelectedCategory(searchParams.get("category") || null);
		setSelectedSubcategory(searchParams.get("subcategory") || null);
		refetchProjects();
	}, [searchParams]);

	useEffect(() => {
		if (searchQuery === "") {
			searchParams.delete("q");
			setSearchParams(searchParams);
		}
	}, [searchParams, searchQuery, setSearchParams]);

	if (fetchingProjectCategories || !categories) {
		return <div className="pt-32">Loading...</div>;
	}

	return (
		<div className="pt-[70px] max-w-screen-xl mx-auto">
			<div className="py-16 px-4 flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4">
				<form onSubmit={onSubmitHandler}>
					<div className="flex items-center w-full md:w-[450px] px-2 bg-white border border-[#ced4da] rounded">
						<IoMdSearch />
						<input
							type="search"
							placeholder="Enter your interest projects"
							value={searchQuery}
							onChange={onChangeSearchHandler}
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
				/>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
				{fetchingProjects && <div>Loading...</div>}
				{projects && projects.data.map((p) => <ProjectCard project={p} key={p.id} />)}
			</div>
			<div className="flex justify-center my-16">
				<Pagination
					total={projects?.lastPage || 1}
					color="#5340ff"
					value={page}
					onChange={(value) => onChangePageHandler(value)}
					styles={{
						control: {
							color: "#222",
						},
					}}
				/>
			</div>
		</div>
	);
}
