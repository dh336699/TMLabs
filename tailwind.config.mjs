import { heroui } from '@heroui/react'

const config = {
	content: ['./src/**/*.{ts,tsx}', './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				'sf-pro-text': [
					'SF Pro Text',
					'-apple-system',
					'BlinkMacSystemFont',
					"'Segoe UI'",
					'Roboto',
					"'Helvetica Neue'",
					'Arial',
					'sans-serif',
				],
				'sf-pro': [
					'SF Pro',
					'-apple-system',
					'BlinkMacSystemFont',
					"'Segoe UI'",
					'Roboto',
					"'Helvetica Neue'",
					'Arial',
					'sans-serif',
				],
				Montserrat: ['Montserrat', 'sans-serif'],
				Unbounded: ['Unbounded', 'sans-serif'],
				Roboto: ['Roboto', 'sans-serif'],
				Syne: ['Syne', 'sans-serif'],
			},
			fontSize: {
				h1: ['66px', 'normal'],
				h2: ['48px', '48px'],
				h3: ['26px', 'normal'],
				h4: ['24px', 'normal'],
				h5: ['20px', 'normal'],
				h6: ['15px', 'normal'],
				descM18: [
					'18px',
					{
						lineHeight: 'normal',
						fontWeight: '500',
					},
				],
				descM16: [
					'16px',
					{
						lineHeight: 'normal',
						fontWeight: '500',
					},
				],
				desc16: ['16px', '160%'],
				descM15: [
					'15px',
					{
						lineHeight: 'normal',
						fontWeight: '500',
					},
				],
				desc15: ['15px', 'normal'],
				descM14: [
					'14px',
					{
						lineHeight: 'normal',
						fontWeight: '500',
					},
				],
				desc14: ['14px', 'normal'],
				descM13: [
					'13px',
					{
						lineHeight: 'normal',
						fontWeight: '500',
					},
				],
				desc13: ['13px', 'normal'],
				descM12: [
					'12px',
					{
						lineHeight: 'normal',
						fontWeight: '500',
					},
				],
				desc12: ['12px', 'normal'],
				descM11: [
					'11px',
					{
						lineHeight: 'normal',
						fontWeight: '500',
					},
				],
				desc11: ['11px', 'normal'],
				descM10: [
					'10px',
					{
						lineHeight: 'normal',
						fontWeight: '500',
					},
				],
				desc10: ['10px', 'normal'],
			},
			animation: {
				vibrate: 'vibrate 100ms linear 4',
				flash: 'flash 1s infinite',
				skeleton: 'skeleton 1.5s ease-in-out infinite',
				'scroll-left': 'scroll-left 10s linear infinite',
				'up-down': 'upDown 3s ease-in-out infinite',
			},
			keyframes: {
				vibrate: {
					'0%, 100%': { transform: 'translate(0)' },
					'25%': { transform: 'translate(3px, 3px)' },
					'50%': { transform: 'translate(-3px, -3px)' },
					'75%': { transform: 'translate(3px, -3px)' },
				},
				flash: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0' },
				},
				'scroll-left': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-50%)' },
				},
				skeleton: {
					'0%, 100%': { backgroundColor: '#353535' },
					'50%': { backgroundColor: '#1c1a1a' },
				},
				upDown: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-15px)' },
				},
			},
			colors: {
				neutralTitle: '#1A1A1A',
				neutralPrimaryText: '#434343',
				baseBorder: '#EDEDED',
				colorPrimary: '#FA9D2B',
				colorPrimaryHover: '#ffb854',
				colorPrimaryActive: '#d47a19',
				approve: '#3888FF',
				rejection: '#F55D6E',
				abstention: '#687083',
				error: '#f55d6e',
				'Neutral-Secondary-Text': '#919191',
				'Primary-Text': '#1A1A1A',
				'Neutral-Primary-Text': '#434343',
				'Neutral-Divider': '#EDEDED',
				'Neutral-Border': '#E1E1E1',
				'Neutral-Disable-Text': '#B8B8B8',
				'Brand-Brand': '#FA9D2B',
				'Brand-Brand-BG': '#F2EEFF',
				'Brand-hover': '#ffb854',
				'Brand-click': '#d47a19',
				'Neutral-Hover-BG': '#FAFAFA',
				'Neutral-Default-BG': '#F6F6F6',
				'Disable-Text': '#B8B8B8',
				'Active-Text': '#F8B042',
				'Reject-Reject': '#F55D6E',
				'Light-Mode-Brand-Brand': '#127FFF',
				link: '#5b8ef4',
				baseBg: 'var(--base-bg)',
				baseText: 'var(--base-text)',
				fillBg: 'var(--fill-bg)',
				fillBg8: 'var(--fill-bg-8)',
				fillBg16: 'var(--fill-bg-16)',
				fillBg40: 'var(--fill-bg-40)',
				fillBlack15: 'var(--fill-black-15)',
				mainColor: 'var(--main-color)',
				mainColor60: 'var(--main-color-60)',
				secondaryMainColor: 'var(--secondary-main-color)',
				secondaryMainTextColor: 'var(--secondary-main-text-color)',
				darkGray: 'var(--dark-gray)',
				lightGrey: 'var(--light-gray)',
				darkBg: 'var(--dark-bg)',
				danger: 'var(--danger)',
				neutralHoverBg: 'var(--neutral-hover-bg)',
				borderColor: 'var(--border-color)',
				tagWarningBg: 'var(--tag-warning-bg)',
				tagSuccessBg: 'var(--tag-success-bg)',
				tagDangerBg: 'var(--tag-danger-bg)',
				tagPrimaryBg: 'var(--tag-primary-bg)',
				tagSecondaryBg: 'var(--tag-secondary-bg)',
				tagWarningText: 'var(--tag-warning-text)',
				tagSuccessText: 'var(--tag-success-text)',
				tagDangerText: 'var(--tag-danger-text)',
				tagPrimaryText: 'var(--tag-primary-text)',
				tagSecondaryText: 'var(--tag-secondary-text)',
			},
			flex: {
				quarter: '1 1 25%',
				half: '1 1 50%',
			},
			backgroundImage: {
				itemShadow:
					'linear-gradient(29deg, #5D49F6 9.71%, rgba(255, 255, 255, 0.2) 40%, rgba(255, 255, 255, 0.2) 100%)',
				blackToMain: 'linear-gradient(to bottom, rgba(0, 0, 0, 0%), #5D49F6)',
			},
		},
		screens: {
			sm: '375px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1537',
			homePc: '768px',
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
