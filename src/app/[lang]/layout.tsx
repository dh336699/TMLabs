import type { Metadata } from 'next'
import '../../styles/globals.css'
import '../../styles/theme.css'

import { Geist, Geist_Mono } from 'next/font/google'

import Launch from '@/components/Launch'
import { serverTranslate } from '@/i18n/server'

import { HeroUIProviders } from './HeroUIProvider'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode
    params: Promise<{ lang: string }>
}>) {
    const lang = (await params).lang

    serverTranslate(lang, 'common')

    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Launch lang={lang} />

                <HeroUIProviders>
                    <Header />
                    {children}
                    <Footer />
                </HeroUIProviders>
            </body>
        </html>
    )
}
