'use client'

import Quesionaire from '@/components/Quesionaire'
import { useCustomSWR } from "@/hooks/useCustomSWR"

export default function HomePage() {
    const {
        data: users,
        error,
        isLoading,
        isEmpty,
        mutate
    } = useCustomSWR<[]>('/survey/questions', {
        // 可覆盖全局配置
        revalidateOnFocus: true,
        ignoreError: true
    })
    return (
        <Quesionaire />
    )
}
