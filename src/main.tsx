import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import i18nOptions from "./i18n/options.ts";
import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

i18n.use(initReactI18next).init(i18nOptions);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
