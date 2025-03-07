"use client"

import React, { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardHeader, CardBody, RadioGroup, Radio, Button } from "@heroui/react";
import { usePrevNextButtons } from "@/hooks/usePrevNextButtons";
import { IQuestionaireItem } from "@/model/question";
import { isEmpty } from "lodash";
import { useTranslation } from "@/i18n/client";
import { httpRequest } from "@/utils/axios";

const Carousel = ({ questionaires }: { questionaires: IQuestionaireItem[] }) => {
    const { t } = useTranslation('question')
    const [curIdx, setCurIds] = useState(0)
    const [answers, setAnswers] = useState<{ question_id: number | string; selected_option_ids: string[] }[]>([])

    const [emblaRef, emblaApi] = useEmblaCarousel({
        skipSnaps: true,
        watchDrag: false
    })
    const {
        onPrevButtonClick,
        onNextButtonClick } = usePrevNextButtons(emblaApi)

    const isDisabledClick = useMemo(() => {
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
    }, [questionaires, curIdx, answers])

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
        const res = await httpRequest('/survey/responses', { data: answers, method: 'POST' })
        console.log(res);
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
            localStorage.setItem('answers', JSON.stringify(answers))
        }
    }, [answers])

    return (
        <div className="xxs:w-[300px] md:w-auto max-w-[1024px] min-h-[400px] pt-12 overflow-hidden mx-auto" >
            <div className="w-full h-full" ref={emblaRef}>
                <div className="flex">
                    {questionaires?.length > 0 && questionaires.map((question) => (
                        <Card key={question.id} style={{ flex: '0 0 90%', margin: '0 20px', padding: '0 20px' }}>
                            <CardHeader className="pb-0 py-4 px-4 flex-col items-start">
                                <h2 className="font-bold">{question.title}</h2>
                            </CardHeader>
                            <CardBody className="overflow-visible py-2 pb-6">
                                <RadioGroup onValueChange={handleSelectAnswer}>
                                    {
                                        !isEmpty(question.options) ? question.options.map(option => (
                                            <Radio value={option.id as string} key={option.id}>{option.content}</Radio>
                                        )) : null

                                    }
                                </RadioGroup>

                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>
            {
                !isEmpty(questionaires) && <div className="mt-[4rem] flex justify-between">
                    {
                        !isFirst ? <Button onPress={onPrevButtonClick}>{t('上一题')}</Button> : <div></div>
                    }
                    {
                        isLast && <Button color="primary" isDisabled={isDisabledClick} onPress={handleSubmit}>{t('结束答题')}</Button>
                    }
                    {
                        !isLast && <Button color="primary" isDisabled={isDisabledClick} className="justify-self-end" onPress={onNextButtonClick}>{t('下一题')}</Button>
                    }
                </div>
            }

        </div>
    )
}
export default Carousel