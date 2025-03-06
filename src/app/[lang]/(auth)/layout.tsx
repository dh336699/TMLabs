import Footer from '@/components/Layout/Footer'
import Header from '@/components/Layout/Header'

export default async function AuthLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode
    params: Promise<{ lang: string }>
}>) {

    return (
        <div className="relative flex flex-col">
            <Header />
            {children}
            <Footer />
        </div>
    )
}
