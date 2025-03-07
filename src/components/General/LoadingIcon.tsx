import { Spinner } from "@heroui/react";
import React from 'react'
const LoadingIcon = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <Spinner />
            <p className="mt-3">正在加载中...</p>
        </div>
    )
}

export default LoadingIcon