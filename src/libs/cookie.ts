const getCookie = (key: string): string | null => {
	const value = document.cookie
		.split("; ")
		.find((row) => row.startsWith(`${key}=`))
		?.split("=")[1];
	if (!value) return null;
	return value;
};

const setCookie = (key: string, value: unknown) => {
	document.cookie = `${key}=${JSON.stringify(value)}`;
};

export { getCookie, setCookie };
