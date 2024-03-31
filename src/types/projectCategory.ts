export type ProjectCategory = {
	id: string;
	name: string;
	subcategories: ProjectSubCategory[];
};

export type ProjectSubCategory = {
	id: string;
	name: string;
};
