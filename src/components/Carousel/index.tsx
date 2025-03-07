"use client"

import React, { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardHeader, CardBody, RadioGroup, Radio, Button, Spinner } from "@heroui/react";
import { usePrevNextButtons } from "@/hooks/usePrevNextButtons";
import { IQuestionaireItem } from "@/model/question";
import { isEmpty } from "lodash";
import { LoadingIcon } from "../General";
import { createBehaviorGiagram, postAnswer } from "@/api/questions";
import { toast } from "react-toastify";

const Carousel = ({ questionaires, setData }: { questionaires: IQuestionaireItem[]; setData: (data: any) => void }) => {
    const [curIdx, setCurIds] = useState(0)
    const [loading, setLoading] = useState(false)
    const [answers, setAnswers] = useState<{ question_id: number | string; selected_option_ids: string[] }[]>([])

    const [emblaRef, emblaApi] = useEmblaCarousel({
        skipSnaps: true,
        watchDrag: false
    })
    const {
        onPrevButtonClick,
        onNextButtonClick } = usePrevNextButtons(emblaApi)

    const isDisabledClick = useMemo(() => {
        if (loading) {
            return true
        }
        if (!isEmpty(questionaires)) {
            const question = questionaires[curIdx]
            const answer = answers.find(a => a.question_id === question.id)
            if (question?.is_required && (!answer || isEmpty(answer?.selected_option_ids))) {
                return true
            } else {
                return false
            }
        } else {
            return true
        }
    }, [questionaires, curIdx, answers, loading])

    const handleSelectAnswer = useCallback((value: string) => {
        const questionId = questionaires[curIdx].id

        if (isEmpty(answers)) {
            setAnswers([{ question_id: questionId, selected_option_ids: [value] }])
        } else {
            const curAsnwer = answers[curIdx] ?? {}
            curAsnwer.question_id = questionId
            curAsnwer.selected_option_ids = [value]
            setAnswers(prev => [...prev, curAsnwer])
        }
    }, [answers, setAnswers, questionaires, curIdx])

    const handleSubmit = useCallback(async () => {
        try {
            setLoading(true)
            setData({ accessmentCompleted: true })
            await postAnswer(answers)
            const res = await createBehaviorGiagram()
            toast.success(res.message, { autoClose: 1000 })
            if (res.download_url) {
                window.location.href = res.download_url; // 直接触发下载
            } else {
                console.error('未获取到下载链接');
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }, [answers])

    const isFirst = useMemo(() => {
        if (!isEmpty(questionaires) && curIdx === 0) {
            return true
        } else {
            return false
        }
    }, [curIdx, questionaires])

    const isLast = useMemo(() => {
        return curIdx === (questionaires?.length - 1)
    }, [curIdx, questionaires])

    const updateState = useCallback(() => {
        if (!emblaApi) return
        setCurIds(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (emblaApi) {
            emblaApi.on('select', updateState)
        }
    }, [emblaApi, updateState])

    useEffect(() => {
        if (!isEmpty(answers)) {
            requestAnimationFrame(() => {
                localStorage.setItem('answers', JSON.stringify(answers))
            })
        }
    }, [answers])

    return <div className="relative md:min-w-[600px] min-h-[400px] pt-12 overflow-hidden" >
        {!isEmpty(questionaires) && <div>
            <p className="text-center text-md font-medium mb-2">第 {curIdx + 1} / {questionaires?.length}题</p>
            <div className="w-full h-full" ref={emblaRef}>
                <div className="flex">
                    {questionaires.map((question) => (
                        <Card style={{ flex: '0 0 90%', margin: '0 20px', padding: '0 20px' }} key={question.id}>
                            <CardHeader className="pb-0 py-4 px-4 flex-col items-start">
                                <h2 className="font-bold">{question.title}</h2>
                            </CardHeader>
                            <CardBody className="overflow-visible py-2 pb-6">
                                <RadioGroup onValueChange={handleSelectAnswer}>
                                    {
                                        !isEmpty(question.options) ? question.options.map(option => (
                                            <Radio key={option.id} value={option.id as string}>{option.content}</Radio>
                                        )) : null
                                    }
                                </RadioGroup>

                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>
            {loading && <Spinner className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
            <div className="mt-[4rem] flex justify-between">
                {
                    !isFirst ? <Button isDisabled={loading} onPress={onPrevButtonClick}>上一题</Button> : <div></div>
                }
                {
                    isLast && <Button color="primary" isDisabled={isDisabledClick} onPress={handleSubmit}>结束答题</Button>
                }
                {
                    !isLast && <Button color="primary" isDisabled={isDisabledClick} className="justify-self-end" onPress={onNextButtonClick}>下一题</Button>
                }
            </div>
        </div>}
        {
            isEmpty(questionaires) && <LoadingIcon />
        }
    </div>
}
export default Carousel