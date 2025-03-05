"use client";
import useSWR, { SWRConfiguration, SWRResponse } from 'swr'
import { AxiosRequestConfig } from 'axios'
import { httpRequest } from '@/utils/axios'
import { isEmpty } from "lodash";

type FetcherConfig = AxiosRequestConfig & {
  // 自定义扩展配置
  ignoreError?: boolean // 是否忽略全局错误处理
  retryCount?: number   // 自定义重试次数
}

// 全局默认配置
const defaultConfig: SWRConfiguration & FetcherConfig = {
    method: 'get',
    revalidateOnFocus: false,
    shouldRetryOnError: true,
    errorRetryInterval: 5000,
    errorRetryCount: 0,
    ignoreError: true,
    retryCount: 0
}

// 封装后的SWR Hook
export function useCustomSWR<Data = any, Error = any>(
  key: string | null, // 支持禁用请求
  config?: SWRConfiguration & FetcherConfig
): SWRResponse<Data, Error> & {
  isLoading: boolean
  isEmpty: boolean
} {
  const mergedConfig = { ...defaultConfig, ...config }
  
  const swrResponse = useSWR<Data, Error>(
    key,
    (url) => httpRequest<Data>(url, mergedConfig),
    mergedConfig
  )
  // 扩展返回属性
  return {
    ...swrResponse,
    isLoading: !swrResponse.error && !swrResponse.data,
    isEmpty: isEmpty(swrResponse.data)
  }
}
