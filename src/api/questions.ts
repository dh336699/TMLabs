import { useCustomSWR } from "@/hooks/useCustomSWR"
import { QuestionaireDTO } from "@/model/question"

const useQuestionaires = () => {
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

export { useQuestionaires }