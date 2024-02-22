import en from "./locales/en.json";
import th from "./locales/th.json";

const defaultLanguage = "en";

export const defaultNamespace = "default";

export const resources = {
	en: {
		[defaultNamespace]: en,
	},
	th: {
		[defaultNamespace]: th,
	},
};

const options = {
	defaultNS: defaultNamespace,
	ns: [defaultNamespace],
	resources,
	lng: defaultLanguage,
	fallbackLng: defaultLanguage,
	interpolation: {
		escapeValue: false,
	},
};

export default options;
