import type { ProjectCategory, ProjectSubCategory } from "./projectCategory";
import type { User } from "./user";

enum ProjectStatus {
	ACTIVE,
	DELETED,
	SUCCESSFUL,
	UNSUCCESSFUL,
}

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
	status: ProjectStatus;
	createdAt: string;
};

// Secondary types

export type CreateProjectPayload = {
	addressId: string;
	projectContractId: string;
	title: string;
	subTitle: string;
	description: string;
	categoryId: string;
	subCategoryId: string;
	location: string;
	image: File | null;
	targetFunding: number;
	endDate: Date | null;
};

export type CreateProjectFormValues = Omit<CreateProjectPayload, "projectContractId">;

export type UpdateProjectPayload = Partial<CreateProjectPayload>;

export type ListProjectParams = {
	page?: number;
	size?: number;
	q?: string;
	category?: string;
	subcategory?: string;
};
