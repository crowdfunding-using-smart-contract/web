module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react-hooks/recommended",
		"prettier",
	],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parserOptions: { ecmaVersion: "latest", sourceType: "module" },
	parser: "@typescript-eslint/parser",
	plugins: ["react-refresh"],
	rules: {
		quotes: ["error", "double", { avoidEscape: true }],
		"@typescript-eslint/no-unused-vars": ["error", { args: "none" }],
		"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
	},
};
