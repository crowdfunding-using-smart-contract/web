import i18next from "i18next";

export const changeBrowserLanguage = async (language: "en" | "th") => {
	await i18next.changeLanguage(language);
};

export const getBrowserLanguage = () => {
	return i18next.language;
};
