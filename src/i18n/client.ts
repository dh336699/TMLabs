import type { Namespace, TOptions } from 'i18next'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import {
    initReactI18next,
    useTranslation as useTranslationOrg,
    UseTranslationOptions,
} from 'react-i18next'

import { getOptions, languages } from './settings'

const runsOnServerSide = typeof window === 'undefined'

const i18n = i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(
        resourcesToBackend((language: string, namespace: string) => {
            return import(`./locales/${language}/${namespace}.json`)
        }),
    )
    .init({
        ...getOptions(undefined, ['global', 'dictionary']),
        detection: {
            order: ['path', 'htmlTag', 'navigator'],
        },
        preload: runsOnServerSide ? languages : [],
    })

export function useTranslation(ns?: string, options?: UseTranslationOptions<string>) {
    const ret = useTranslationOrg(ns, options)

    if (options?.lng && ret.i18n.language !== options.lng) {
        ret.i18n.changeLanguage(options.lng)
    }
    return ret
}

export default i18n

// tSync未加载ns时使用会有异常，建议使用tFixed
export const tSync = (key: string, options?: TOptions) => {
    if (options?.ns && !i18next.options.ns?.includes(options.ns as string)) {
        i18next.loadNamespaces(options.ns)
    }
    return i18next.t(key, options)
}

// const t = tFixed("title", "common", 'user.changePassword')
// 等价 i18next.t('user.changePassword.title', {ns : common});
export const tFixed = (key: string, ns: Namespace, keyPrefix?: string) => {
    const t = i18next.getFixedT(null, ns || null, keyPrefix || '')
    return t(key)
}

export const getFixedT = (ns: Namespace, keyPrefix?: string) => {
    const t = i18next.getFixedT(null, ns || null, keyPrefix || '')

    return t
}
