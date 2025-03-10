import { IPagination } from '@/model/common'
export interface IQuestionaireItem {
    is_required: number;
    id: number;
    sort_order: number;
    title: string;
    type: string;
    options: {
        id: number | string,
        content: string,
        sort_order: number
    }[]
}
export type QuestionaireDTO = { data: IQuestionaireItem[] } & IPagination