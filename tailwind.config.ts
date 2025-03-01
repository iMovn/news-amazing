import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '960px',
			xl: '1280px'
		},
		fontFamily: {
			primary: 'var(--font-mulish)',
			secondary: 'var(--font-playfairDisplay)'
		},
		extend: {
			colors: {
				primary: '#0C4476',
				secondary: '#3D91A0',
				thirdary: '#E56427',
				border: "#E5E7EB",
			},
		},
	},
	plugins: [
		animate
	],
};
export default config;
