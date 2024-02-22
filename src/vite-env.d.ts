/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_ENDPOINT: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

interface Window {
	readonly publicRuntimeConfig: Record<string, string>;
}
