import type { ProjectCategory, ProjectSubCategory } from "./projectCategory";
import type { User } from "./user";

export type Project = {
	id: string;
	title: string;
	subTitle: string;
	description: string;
	category: ProjectCategory;
	subCategory: ProjectSubCategory;
	location: string;
	image: string;
	targetFunding: number;
	currentFunding: number;
	monetaryUnit: string;
	startDate: string;
	endDate: string;
	launchDate: string;
	owner: User;
	createdAt: string;
};

// Secondary types

export type CreateProjectPayload = {
	title: string;
	subTitle: string;
	categoryId: string;
	subCategoryId: string;
	location: string;
	image: File | null;
	description: string;
	targetFunding: number;
	monetaryUnit: string;
	endDate: Date | null;
	lanuchDate: Date | null;
};

export type UpdateProjectPayload = Partial<CreateProjectPayload>;

export type ListProjectParams = {
	page?: number;
	size?: number;
	q?: string;
	category?: string;
	subcategory?: string;
};
