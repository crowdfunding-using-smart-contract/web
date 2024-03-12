export type ErrorFields<T> = {
	field: keyof T;
	message: string;
};
