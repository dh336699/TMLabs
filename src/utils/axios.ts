'use client'
import axios, { AxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'
import { isEmpty } from 'lodash'

type FetcherConfig = AxiosRequestConfig & {
	// 自定义扩展配置
	ignoreError?: boolean // 是否忽略全局错误处理
	retryCount?: number // 自定义重试次数
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
		return data
	} catch (error) {
		// 统一错误处理
		if (!config?.ignoreError) {
			handleGlobalError(error)
		}
		throw error
	}
}

axios.interceptors.response.use(
	(response) => {
		// 统一处理响应数据格式
		if (response.data?.code && response.data?.code !== 0) {
			return Promise.reject(response.data)
		}
		if (response.status === 200) {
			return !isEmpty(response.data) ? response.data : response
		}
	},
	(error) => Promise.reject(error),
)
// 全局错误处理函数
const handleGlobalError = (error: unknown) => {
	if (axios.isAxiosError(error)) {
		const status = error.response?.status
		const message = error.response?.data?.message || '服务器异常'

		switch (status) {
			case 401:
				toast.error('请先登录', {
					onClose: () => {
						window.location.href = '/login'
					},
				})
				break
			case 403:
				toast.error('权限不足')
				break
			default:
				toast.error(message)
		}
	} else {
		toast.error('未知错误')
	}
}
