import acceptLanguage from 'accept-language'
import { NextRequest, NextResponse } from 'next/server'

import { fallbackLng, languages } from '../i18n/settings'

acceptLanguage.languages(languages)

async function languageMiddleware(req: NextRequest) {
	const pathname = req.nextUrl.pathname

	// Redirect if lng in path is not supported
	if (!languages.some((loc) => pathname.startsWith(`/${loc}`))) {
		const lng = acceptLanguage.get(req.headers.get('Accept-Language')) || fallbackLng

		return NextResponse.redirect(new URL(`/${lng}${pathname}${req.nextUrl.search}`, req.url))
	}
}

export default languageMiddleware
