'use client'
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'

export default function AuthPage({ children }: { children: React.ReactNode }) {
    const [token] = useState(typeof window !== 'undefined' ? localStorage.getItem('token') : null)
    const router = useRouter()
    useEffect(() => {
        if (!token) {
            router.replace('/login') // 如果没有 Token，跳转到登录页
        }
    }, [router, token])
    return <>
        {token && children}
    </>
}