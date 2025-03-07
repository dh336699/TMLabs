"use client";
import { useQuestionaires } from "@/api/questions";
import Carousel from "@/components/Carousel"

export default function HomePage() {
    const {
        data,
    } = useQuestionaires()

    return (
        <Carousel questionaires={data?.data || []} />
    )
}
