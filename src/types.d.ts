interface I18nItem {
	cover?: string
	title: string
	description: string[]
}

interface I18nObject extends I18nItem {
	items?: I18nItem[]
}
