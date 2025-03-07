import { Spinner } from "@heroui/react";
import React from 'react'
import { useTranslation } from "react-i18next";
const LoadingIcon = () => {
    const { t } = useTranslation('common')
    return (
        <div className="flex flex-col items-center justify-center">
            <Spinner />
            <p className="mt-3">{t('正在加载中')}</p>
        </div>
    )
}

export default LoadingIcon