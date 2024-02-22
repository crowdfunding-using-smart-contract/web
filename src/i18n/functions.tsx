import i18next from "i18next";

export const changeBrowserLanguage = async (language: string) => {
	await i18next.changeLanguage(language);
};
