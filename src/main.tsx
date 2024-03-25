import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import i18nOptions from "./i18n/options.ts";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/carousel/styles.css";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";
import "./index.css";

dayjs.extend(relativeTime);
i18n.use(initReactI18next).init(i18nOptions);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
