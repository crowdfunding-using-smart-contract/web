export type Transaction = {
	id: number;
	refCode: string;
	createdAt: string;
	updatedAt: string;
};

export type GetTransactionParams = {
	refCode: string;
};
