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
	startDate: string;
	endDate: string;
	rating: number;
	owner: User;
	status: ProjectStatus;
	projectContractId: string;
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

export type GetBackedProjectResponse = {
	fundAmount: string;
	project: Project;
};
