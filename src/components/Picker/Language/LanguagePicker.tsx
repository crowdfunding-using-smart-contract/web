import { useTranslation } from "react-i18next";

export default function LanguagePicker() {
	const { i18n } = useTranslation();
	const isEnglish = i18n.language === "en";

	function handleChangeLanguage(lang: "en" | "th") {
		i18n.changeLanguage(lang);
	}

	return (
		<div className="flex items-center">
			{isEnglish ? (
				<img src="/assets/flag-en.png" alt="EN" className="w-4 mr-2" />
			) : (
				<img src="/assets/flag-th.png" alt="TH" className="w-4 mr-2" />
			)}
			<button
				className={`text-sm ${isEnglish ? "font-semibold" : ""}`}
				disabled={isEnglish}
				onClick={() => handleChangeLanguage("en")}
			>
				EN
			</button>
			<span className="text-sm">/</span>
			<button
				className={`text-sm ${!isEnglish ? "font-semibold" : ""}`}
				disabled={!isEnglish}
				onClick={() => handleChangeLanguage("th")}
			>
				TH
			</button>
		</div>
	);
}
