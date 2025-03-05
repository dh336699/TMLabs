"use client"

import React, { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardHeader, CardBody, RadioGroup, Radio, Button } from "@heroui/react";
import { usePrevNextButtons } from "@/hooks/usePrevNextButtons";
import { IQuestionaireItem } from "@/model/question";
import { isEmpty } from "lodash";
import { useTranslation } from "@/i18n/client";

const Carousel = ({ questionaires }: { questionaires: IQuestionaireItem[] }) => {
    const { t } = useTranslation('question')
    const [curIdx, setCurIds] = useState(0)

    const [emblaRef, emblaApi] = useEmblaCarousel({
        skipSnaps: true,
        watchDrag: false
    })
    const { prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick } = usePrevNextButtons(emblaApi)

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
        console.log(emblaApi.selectedScrollSnap());
        setCurIds(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (emblaApi) {
            emblaApi.on('select', updateState)
        }
    }, [emblaApi, updateState])

    return (
        <div className="xxs:w-[300px] md:w-auto max-w-[1024px] min-h-[400px] pt-12 overflow-hidden mx-auto" >
            <div className="w-full h-full" ref={emblaRef}>
                <div className="flex">
                    {questionaires?.length > 0 && questionaires.map((question) => (
                        <Card style={{ flex: '0 0 90%', margin: '0 20px', padding: '0 20px' }}>
                            <CardHeader className="pb-0 py-4 px-4 flex-col items-start">
                                <h2 className="font-bold">{question.title}</h2>
                            </CardHeader>
                            <CardBody className="overflow-visible py-2 pb-6">
                                {
                                    !isEmpty(question.options) &&
                                    <RadioGroup>
                                        <Radio value="buenos-aires">Buenos Aires</Radio>
                                        <Radio value="sydney">Sydney</Radio>
                                        <Radio value="san-francisco">San Francisco</Radio>
                                        <Radio value="london">London</Radio>
                                        <Radio value="tokyo">Tokyo</Radio>
                                    </RadioGroup>
                                }
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
                        isLast && <Button color="primary" onPress={onNextButtonClick}>{t('结束答题')}</Button>
                    }
                    {
                        !isLast && <Button color="primary" className="justify-self-end" onPress={onNextButtonClick}>{t('下一题')}</Button>
                    }
                </div>
            }

        </div>
    )
}
export default Carousel