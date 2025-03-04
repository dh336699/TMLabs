// components/SmoothCardStack.tsx
'use client';
import { Button } from "@heroui/react";
import { motion, AnimatePresence } from 'framer-motion';
import { useCallback, useState } from 'react';
import { RadioGroup, Radio } from "@heroui/react";
import { debounce } from "lodash";

const cards = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
];

export default function Quesionaire() {
    const [cardStack, setCardStack] = useState(cards);

    const handleNext = useCallback(debounce(() => {
        setCardStack(prev => {
            const [first, ...rest] = prev;
            return [...rest, first];
        });
    }, 500, { leading: true, trailing: false }), [])

    // 卡片样式生成器
    const getCardStyle = (index: number) => ({
        zIndex: 4 - index, // 层级递减
        scale: 1 - index * 0.05, // 尺寸递减
        top: index * (-30),    // 向上偏移量
    });

    return (
        <div className="pt-[10rem]">
            <div className="flex justify-center items-end gap-4">
                <Button color="primary" onPress={handleNext}>上一题</Button>
                <div className="relative h-96 w-96">
                    {/* 始终渲染全部卡片 */}
                    {cardStack.map((card, index) => (
                        <motion.div
                            key={card.id}
                            className="absolute w-full pb-12 bg-white shadow-lg rounded-t-xl"
                            initial={false}
                            animate={getCardStyle(index)}
                            transition={{
                                type: 'spring',
                                stiffness: 300,
                                damping: 20,
                                delay: index * 0.05 // 层级动画延迟
                            }}
                            style={{
                                originX: 0.5,
                                originY: 1 // 设置缩放基点到底部
                            }}
                        >
                            <AnimatePresence>
                                {/* 主卡片内容动画 */}
                                <motion.div
                                    key={card.id + '-content'}
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -50, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >

                                    <h2 className="text-xl text-white font-bold text-center py-4 rounded-t-xl bg-rose-500">{card.content}</h2>
                                    <div className="mt-6 px-8">
                                        <RadioGroup label="Select your favorite city">
                                            <Radio value="buenos-aires">Buenos Aires</Radio>
                                            <Radio value="sydney">Sydney</Radio>
                                            <Radio value="san-francisco">San Francisco</Radio>
                                            <Radio value="london">London</Radio>
                                            <Radio value="tokyo">Tokyo</Radio>
                                            <Radio value="london">London</Radio>
                                            <Radio value="tokyo">Tokyo</Radio>
                                            <Radio value="london">London</Radio>
                                        </RadioGroup>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    ))}

                </div>
                <div>

                    {/* 下一题按钮 */}
                    <Button color="primary" onPress={handleNext}>下一题</Button>
                </div>
            </div>
        </div>
    );
}