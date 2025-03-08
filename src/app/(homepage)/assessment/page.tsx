"use client";
import { useQuestionaires } from "@/api/questions";
import Carousel from "@/components/Carousel"
import { GlobalContext } from "../../GlobalContexrProvider";
import { useContext } from "react";

export default function HomePage() {
    const {
        data,
    } = useQuestionaires()

    const { setData } = useContext(GlobalContext);

    return (
        <div className="flex justify-center items-center">
            <Carousel questionaires={data?.data || []} setData={setData} />
        </div>
    )
}
