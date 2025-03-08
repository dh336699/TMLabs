import { useCustomSWR } from "@/hooks/useCustomSWR"
import { IPagination } from "@/model/common"

interface IReportItem {
    id: number
    report_name: string
    report_summary: string
    created_at: string
}

interface IReportDTO {
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
    } = useCustomSWR<IReportDTO>('/survey/reports')

    return {
        data,
        error,
        isLoading,
        isEmpty,
        mutate
    }
}