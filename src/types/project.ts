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
