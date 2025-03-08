'use client'
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'

export default function AuthPage({ children }: { children: React.ReactNode }) {
    const [token] = useState(localStorage.getItem('token'))
    const router = useRouter()
    useEffect(() => {
        if (!token) {
            router.replace('/login') // 如果没有 Token，跳转到登录页
        }
    }, [token])
    return <>
        {token && children}
    </>
}