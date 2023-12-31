export type ResultResponse<T> = {
	status: string;
	statusCode: number;
	result: T;
};
