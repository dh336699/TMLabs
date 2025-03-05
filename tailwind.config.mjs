import { heroui } from '@heroui/react'

const config = {
	content: ['./src/**/*.{ts,tsx}', './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
            screens: {
                'xxs': '320px',
                'xs': '480px',
                'md': '640px',
            }
        },
	},
	darkMode: 'class',
	plugins: [
		heroui({
			themes: {
				light: {
					colors: {
						primary: {
							DEFAULT: 'rgba(228, 61, 57, 1)',
							foreground: '#ffffff',
						},
						background: '#000000',
						foreground: '#ffffff',
					},
				},
			},
		}),
	],
}

export default config
