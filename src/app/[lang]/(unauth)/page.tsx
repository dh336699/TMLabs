"use client";
import { useQuestionaires } from "@/api/questions";
import Carousel from "@/components/Carousel"

export default function HomePage() {
    const {
        data,
        error,
        isLoading,
        isEmpty,
        mutate
    } = useQuestionaires()
    console.log(data);

    return (
        <Carousel questionaires={data!} />
    )
}
