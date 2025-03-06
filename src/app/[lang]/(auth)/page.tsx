"use client";
import { useQuestionaires } from "@/api/questions";
import Carousel from "@/components/Carousel"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
    const router = useRouter();
    const {
        data,
        error,
        isLoading,
        isEmpty,
        mutate
    } = useQuestionaires()

    useEffect(() => {
        const token = localStorage.getItem("token"); // 获取存储的 token
        if (!token) {
            router.replace("/login");  // 没有 token，跳转到 login 页
        }
    }, [router]);

    return (
        <Carousel questionaires={data?.data || []} />
    )
}
