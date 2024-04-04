const getCookie = (key: string): string | null => {
	const value = document.cookie
		.split("; ")
		.find((row) => row.startsWith(`${key}=`))
		?.split("=")[1];
	if (!value) return null;
	return JSON.parse(value);
};

const setCookie = (key: string, value: unknown) => {
	document.cookie = `${key}=${JSON.stringify(value)}`;
};

const removeCookie = (key: string) => {
	document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export { getCookie, setCookie, removeCookie };
