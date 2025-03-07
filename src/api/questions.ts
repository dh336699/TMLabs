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
export const postAnswer = (data: { question_id: number | string; selected_option_ids: string[] }[]) => httpRequest('/survey/responses', { data, method: 'POST' })

export const createBehaviorGiagram = () => httpRequest('/survey/generate-report', { method: 'POST' })