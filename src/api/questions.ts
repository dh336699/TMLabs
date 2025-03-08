import { useCustomSWR } from "@/hooks/useCustomSWR"
import { QuestionaireDTO } from "@/model/question"
import { httpRequest } from "@/utils/axios"

export const useQuestionaires = () => {
    const {
        data,
        error,
        isLoading,
        isEmpty,
        mutate
    } = useCustomSWR<QuestionaireDTO>('/survey/questions')

    return {
        data,
        error,
        isLoading,
        isEmpty,
        mutate
    }
}
export const postAnswer = (responses: { question_id: number | string; selected_option_ids: string[] }[]) => httpRequest('/survey/responses', { data: { responses }, method: 'POST' })

interface ReportResponse {
  message: string;
  report_id: number;
  report_name: string;
  download_url: string;
}
export const createBehaviorDiagram = () => httpRequest<ReportResponse>('/survey/generate-report', { method: 'POST', ignoreError: true })