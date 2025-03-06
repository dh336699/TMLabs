export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode
    params: Promise<{ lang: string }>
}>) {

    return (
        <div>
            {children}
        </div>
    )
}
