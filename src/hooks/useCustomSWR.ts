import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import axios, { AxiosRequestConfig } from 'axios';

// 自定义 fetcher 配置
type FetcherConfig = AxiosRequestConfig & {
  ignoreError?: boolean; // 是否忽略全局错误处理
  retryCount?: number;   // 自定义重试次数
};

// 全局默认配置
const defaultConfig: SWRConfiguration & FetcherConfig = {
  revalidateOnFocus: false,
  shouldRetryOnError: true,
  errorRetryInterval: 5000,
  errorRetryCount: 3,
  ignoreError: false,
  retryCount: 3,
};

// 自定义 fetcher
const customFetcher = async <Data = any>(
  url: string,
  config?: FetcherConfig
): Promise<Data> => {
  try {
    const { data } = await axios.request<Data>({
      url,
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      ...config,
    });
    return data;
  } catch (error) {
    if (!config?.ignoreError) {
      handleGlobalError(error);
    }
    throw error;
  }
};

// 全局错误处理
const handleGlobalError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.message || '请求错误';

    switch (status) {
      case 401:
        window.location.href = '/login';
        break;
      case 403:
        alert('权限不足');
        break;
      default:
        alert(`错误代码：${status}\n错误信息：${message}`);
    }
  } else {
    alert('未知错误');
  }
};

// 改进后的 useCustomSWR
export function useCustomSWR<Data = any, Error = any>(
  key: string | null, // 支持禁用请求
  config?: SWRConfiguration & FetcherConfig
): SWRResponse<Data, Error> & {
  isLoading: boolean; // 是否正在加载
  isEmpty: boolean;  // 数据是否为空
  isError: boolean;  // 是否发生错误
} {
  const mergedConfig = { ...defaultConfig, ...config };

  const swrResponse = useSWR<Data, Error>(
    key,
    (url: string) => customFetcher<Data>(url, mergedConfig),
    mergedConfig
  );

  // 扩展返回属性
  return {
    ...swrResponse,
    isLoading: !swrResponse.error && !swrResponse.data,
    isEmpty: swrResponse.data && Array.isArray(swrResponse.data)
      ? swrResponse.data.length === 0
      : false,
    isError: !!swrResponse.error,
  };
}