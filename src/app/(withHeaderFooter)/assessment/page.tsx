"use client";
import { useQuestionaires } from "@/api/questions";
import Carousel from "@/components/Carousel"

export default function HomePage() {
    const {
        data,
    } = useQuestionaires()


    return (
        <div className="flex justify-center items-center">
            <Carousel questionaires={data?.data || []} />
        </div>
    )
}
