/** @type {import('tailwindcss').Config} */
// import colors from "tailwindcss/colors";

export default {
	content: ["./src/**/*.tsx"],
	darkMode: false,
	theme: {
		extend: {
			colors: {
				primary: "rgb(var(--color-primary) / <alpha-value>)",
				"font-primary": "rgb(var(--color-text-primary) / <alpha-value>)",
				// "light-blue": colors.sky,
				// "warm-gray": colors.stone,
				// "true-gray": colors.neutral,
				// "cool-gray": colors.gray,
				// "blue-gray": colors.slate,
				// ...colors,
			},
		},
	},
	plugins: [],
};
