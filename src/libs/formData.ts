function camelToSnakeCase(str: string) {
	return str.replace(/[A-Z]/g, (letter: string) => `_${letter.toLowerCase()}`);
}

export function parseToFormData<T>(payload: T) {
	const formData = new FormData();
	for (const key in payload) {
		const newKey = camelToSnakeCase(key);
		const value = payload[key as keyof T];
		if (value instanceof File) {
			formData.append(newKey, value as File);
		} else if (value instanceof Date) {
			formData.append(newKey, value.toISOString());
		} else {
			formData.append(newKey, value as string);
		}
	}

	return formData;
}
