export const fallbackLng = 'zh-CN'
export const languages = [fallbackLng, 'en']
export const defaultNS = 'global'

export function getOptions(lng = fallbackLng, ns: string | string[] = defaultNS) {
	return {
		// debug: true,
		supportedLngs: languages,
		fallbackLng,
		lng,
		fallbackNS: defaultNS,
		defaultNS,
		ns,
	}
}

export const languagesLabel = [
	{ lang: 'zh-CN', label: '中文' },
	{ lang: 'en', label: 'English' },
]
