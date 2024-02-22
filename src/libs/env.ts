export default function getEnv(name: string) {
	if (
		window.publicRuntimeConfig &&
		window.publicRuntimeConfig[name] &&
		!window.publicRuntimeConfig[name].startsWith("{{") &&
		!window.publicRuntimeConfig[name].endsWith("}}")
	) {
		return window.publicRuntimeConfig[name];
	}

	return import.meta.env[name];
}
