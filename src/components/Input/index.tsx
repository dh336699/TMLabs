import React, { forwardRef } from 'react';
import { Input as InputComponent } from '@heroui/react'

// 从InputComponent组件继承属性类型
type InputComponentProps = React.ComponentProps<typeof InputComponent>;

// 自定义Input组件的属性
const Input = (props: InputComponentProps, ref: React.Ref<HTMLInputElement>) => {

    return (
        <InputComponent
            ref={ref}
            isClearable
            classNames={{
                label: "text-black dark:text-white/90",
                input: [
                    "bg-black/20",
                    "text-black/90 dark:text-white/90",
                    "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                ],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                    "shadow-xl",
                    "rounded-md",
                    "border-none",
                    "bg-black/20",
                    "dark:bg-black/30",
                    "backdrop-blur-xl",
                    "backdrop-saturate-200",
                    "hover:bg-black/30",
                    "dark:hover:bg-black/30",
                    "group-data-[focus=true]:bg-black/20",
                    "dark:group-data-[focus=true]:bg-black/60",
                    "!cursor-text",
                ],
            }}
            label="Search"
            placeholder="Type to search..."
            radius="lg"
            {...props}
        />
    );
};

export default forwardRef(Input);
