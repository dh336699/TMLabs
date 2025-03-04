import { NextRequest, NextResponse } from 'next/server'

import languageMiddleware from './middlewares/language'

type Middleware = (req: NextRequest) => NextResponse | Promise<NextResponse | any> | any

export const config = {
	matcher: ['/((?!_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
}

const middlewares: Middleware[] = [languageMiddleware]

export async function middleware(req: NextRequest) {
	for (let i = 0, len = middlewares.length; i < len; i++) {
		const mw = middlewares[i]
		const result = await mw(req)

		if (result) {
			return result
		}
	}

	return NextResponse.next()
}
