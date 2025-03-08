"use client";
import { useQuestionaires } from "@/api/questions";
import Carousel from "@/components/Carousel"

export default function HomePage() {
    const {
        data,
    } = useQuestionaires()


    return (
        <div className="flex justify-center items-center pt-12 pb-12">
            <Carousel questionaires={data?.data || []} />
        </div>
    )
}
