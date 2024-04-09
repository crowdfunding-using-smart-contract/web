import Cookies from "js-cookie";

const getCookie = (key: string): string | undefined => {
	return Cookies.get(key);
};

const setCookie = (key: string, value: string) => {
	Cookies.set(key, value);
};

const removeCookie = (key: string) => {
	Cookies.remove(key);
};

export { getCookie, setCookie, removeCookie };
