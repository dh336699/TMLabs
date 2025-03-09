'use client'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'
import { isEmpty } from 'lodash'
import { addToast } from "@heroui/react"

type FetcherConfig = AxiosRequestConfig & {
	// 自定义扩展配置
	ignoreError?: boolean; // 是否忽略全局错误处理
}

export const httpRequest = async <Data = any>(
	url: string,
	config?: FetcherConfig,
): Promise<Data> => {
	try {
		const data: any = await axios.request<Data>({
			url,
			baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			...config,
		})
        if (data.code && data.code !==200) {
            addToast({ title: data.message || '服务器异常', color: 'danger'})
        }
		return data
	} catch (error) {
		// 统一错误处理
		if (!config?.ignoreError) {
			handleGlobalError(error as AxiosError)
		}
	}
}

axios.interceptors.response.use(
	(response) => {
		if (response.status >= 200 && response.status < 300 ) {
			return !isEmpty(response.data) ? response.data : response
		} else {
            return Promise.reject(response.data)
        }
	},
	(error) => Promise.reject(error),
)
// 全局错误处理函数
const handleGlobalError = (error: AxiosError) => {
    
	if (axios.isAxiosError(error)) {
		const status = error.response?.status
		const message = (error.response?.data as any)?.message || '服务器异常'
        
		switch (status) {
			case 401:
                addToast({ title: '请先登录', color: 'danger'})
	            window.location.href = '/login'
				break
			case 403:
                addToast({ title: '权限不足', color: 'danger'})
				break
			default:
                addToast({ title: message, color: 'danger'})
		}
	} else {
        addToast({ title: '未知错误', color: 'danger'})
	}

    return Promise.reject(error)
}
