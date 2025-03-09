'use client'
import { useEffect } from "react"
import { useRouter } from 'next/navigation'

export default function AuthPage({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    useEffect(() => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (!token) {
            router.replace('/login') // 如果没有 Token，跳转到登录页
        }
    }, [])
    return <>
        {children}
    </>
}