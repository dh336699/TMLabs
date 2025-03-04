'use client'

import Image from 'next/image'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'

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
        <Navbar
            maxWidth="2xl"
            classNames={{
                wrapper: 'max-w-[1520px] h-[56px] px-4',
            }}
            isMenuOpen={isOpen}
            height="56px"
            onMenuOpenChange={onOpenChange}
            isBlurred={false}
        >
            <NavbarBrand className="gap-4">
                <Image
                    width={44}
                    height={24}
                    src="/assets/logo.svg"
                    alt="Nezha Quant"
                />
                <div className="text-xl text-primary md:text-xl">交易心理测评</div>
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

            <FontAwesomeIcon icon={faUser} className="w-5 h-5 text-white" />
            {/* 
			<NavbarContent
				justify="end"
			>
				<NavbarItem>
					<Button
						color="primary"
						variant="light"
						onPress={switchLang}
					>
						{languagesLabel.map((lg, idx) => (
							<div
								key={lg.lang}
								className="flex items-center gap-2"
							>
								{idx ? <div className="h-4 w-[1px] bg-foreground" /> : null}
								<span
									className={
										lang === lg.lang ? 'text-primary' : 'text-foreground'
									}
								>
									{lg.label}
								</span>
							</div>
						))}
					</Button>
				</NavbarItem>
            </NavbarContent> */}

            {/* <NavbarMenuToggle
				aria-label={isOpen ? 'Close menu' : 'Open menu'}
				className="md:hidden"
				icon={(isOpen) => (
					<FontAwesomeIcon
						className="text-xl text-primary"
						icon={isOpen ? faXmark : faBars}
					/>
				)}
			/> */}
        </Navbar>
    )
}

export default Header
