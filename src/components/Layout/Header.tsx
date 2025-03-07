'use client'

import Image from 'next/image'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

import { useTranslation } from '@/i18n/client'
import { languagesLabel } from '@/i18n/settings'
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    Navbar,
    NavbarBrand,
    Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button,
    useDisclosure,
} from '@heroui/react'

const Header = () => {
    const { t } = useTranslation('layout')
    const searchParams = useSearchParams()
    const { isOpen, onOpenChange, onClose } = useDisclosure()
    const pathname = usePathname()
    const { lang } = useParams<{ lang: string }>()
    const router = useRouter()

    // const switchLang = useCallback(() => {
    //     const search = searchParams.toString()

    //     router.replace(
    //         `/${lang === 'zh-CN' ? 'en' : 'zh-CN'}/${pathname.split('/').slice(2).join('/')}${search ? `?${search}` : ''}`,
    //     )
    // }, [searchParams, router, lang, pathname])

    const isActive = useCallback(
        (name: string) => {
            const _pathname = pathname.replace(`/${lang}`, '')
            return (_pathname === '' && name === '/') || _pathname === name
        },
        [lang, pathname],
    )

    return (
        <div className="border-b-[0.5px] border-solid border-gray-800 sticky top-0 z-10 bg-black">
            <Navbar
                maxWidth="2xl"
                classNames={{
                    wrapper: 'max-w-[1520px] h-[80px] px-4',
                }}
                isMenuOpen={isOpen}
                height="80px"
                onMenuOpenChange={onOpenChange}
                isBlurred={false}
            >
                <NavbarBrand className="gap-4 cursor-pointer" onClick={() => router.push('/')}>
                    <Image
                        width={44}
                        height={24}
                        src="/assets/logo.svg"
                        alt="Nezha Quant"
                    />
                    <div className="text-xl text-primary md:text-xl font-bold">TMLabs - 全球首个AI交易心理测评平台</div>
                </NavbarBrand>

                <Dropdown>
                    <DropdownTrigger className="cursor-pointer">
                        <FontAwesomeIcon icon={faBars} className="w-5 h-5 text-white" />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Change Languages">
                        {
                            languagesLabel.map(language => <DropdownItem key={language.lang}>{language.label}</DropdownItem>)
                        }
                    </DropdownMenu>
                </Dropdown>

                <FontAwesomeIcon icon={faUser} onClick={() => router.push('/user-center')} className="w-5 h-5 text-white cursor-pointer" />
            </Navbar>
        </div>
    )
}

export default Header
