'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

import { useTranslation } from '@/i18n/client'
import {
    faDiscord,
    faFacebookF,
    faInstagram,
    faXTwitter,
    faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@heroui/react'

const Footer = () => {
    const { lang } = useParams<{ lang: string }>()
    const { t } = useTranslation('layout')
    const footerI18n = useMemo(() => t('footer.slogan', { returnObjects: true }) as string[], [t])

    return (
        <footer className="constrict-content">

        </footer>
    )
}

export default Footer
