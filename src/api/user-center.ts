import { useCustomSWR } from "@/hooks/useCustomSWR"
import { IPagination } from "@/model/common"
import { httpRequest } from "@/utils/axios"

export interface IReportItem {
    id: number
    report_name: string
    report_summary: string
    created_at: string
}

export interface IReportDTO {
    data: IReportItem[],
    pagination: IPagination
}
export const useReportList = () => {
    const {
        data,
        error,
        isLoading,
        isEmpty,
        mutate
    } = useCustomSWR<IReportDTO>('/survey/reports?limit=3&page=1')

    return {
        data,
        error,
        isLoading,
        isEmpty,
        mutate
    }
}
// 下载报告
export const downloadReport = (reportId: number) => httpRequest(`/survey/reports/${reportId}/download`, { method: 'GET' })
