/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['Booton', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace']
			},
			borderRadius: {
				xs: '0.0625rem',
				sm: '0.125rem',
				md: '0.25rem',
				lg: '0.5rem',
				full: '99rem'
			},
			colors: {
				brand: {
					DEFAULT: 'rgb(var(--color-brand) / <alpha-value>)',
					emphasised: 'rgb(var(--color-brand-emphasised) / <alpha-value>)',
					text: 'rgb(var(--color-brand-text) / <alpha-value>)',
					border: 'rgb(var(--color-brand-border) / <alpha-value>)'
				}
			},
			backgroundColor: {
				'surface-light': '#F8F9FA',
				'surface-dark': '#00060F',
				'surface-subtle-light': '#F1F3F5',
				'surface-subtle-dark': '#141A22'
			},
			textColor: {
				'primary-light': '#1F232B',
				'primary-dark': '#E0E1E2',
				'secondary-light': '#3A3F49',
				'secondary-dark': '#B8BABC'
			},
			borderColor: {
				'border-light': '#E1E4E8',
				'border-dark': '#29303A'
			}
		}
	},
	plugins: []
};
