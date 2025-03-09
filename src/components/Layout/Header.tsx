'use client'

import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'

import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    Navbar,
    NavbarBrand,
    Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
    useDisclosure,
} from '@heroui/react'
import { useCallback, useContext, useEffect, useState } from "react"
import { GlobalContext } from "@/app/GlobalContexrProvider"

const Header = () => {
    const { isOpen, onOpenChange } = useDisclosure()
    const [hasToken, setHasToken] = useState(false);
    const router = useRouter()
    const pathname = usePathname()
    const { data, setData } = useContext(GlobalContext)

    // 判断菜单是否激活
    const isHomeActive = pathname === '/'
    const isAssessmentActive = pathname === '/assessment' || pathname.startsWith('/assessment/')

    const handleLoginOut = useCallback(() => {
        setData({ ...data, token: undefined })
        router.push('/login')
    }, [])

    useEffect(() => {
        setHasToken(!!data.token);
    }, [data.token]);

    return (
        <div className="border-b-[0.5px] border-solid border-gray-800 sticky top-0 z-10 bg-black box-border">
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
                    <div className="text-xl text-primary md:text-xl font-bold hidden md:inline-block">TMLabs - 全球首个AI交易心理测评平台</div>
                    <div className="text-xl text-primary md:text-xl font-bold inline-block md:hidden">TMLabs</div>
                </NavbarBrand>

                {/* 导航菜单 */}
                <div className="hidden md:flex gap-6 mx-4">
                    <div
                        className={`flex items-center gap-2 cursor-pointer transition-colors relative ${isHomeActive
                            ? 'text-primary font-medium'
                            : 'text-white hover:text-primary'
                            }`}
                        onClick={() => router.push('/')}
                    >
                        <span>首页</span>
                        {isHomeActive && <div className="absolute -bottom-[29px] left-0 w-full h-0.5 bg-primary"></div>}
                    </div>
                    <div
                        className={`flex items-center gap-2 cursor-pointer transition-colors relative ${isAssessmentActive
                            ? 'text-primary font-medium'
                            : 'text-white hover:text-primary'
                            }`}
                        onClick={() => router.push('/assessment')}
                    >
                        <span>开始测评</span>
                        {isAssessmentActive && <div className="absolute -bottom-[29px] left-0 w-full h-0.5 bg-primary"></div>}
                    </div>
                </div>

                <div className="flex items-center gap-4 ml-auto">
                    {/* 未登录时显示登录注册按钮 */}
                    {!hasToken ? (
                        <div className="flex gap-3">
                            <button
                                className="px-4 py-1 text-white border border-white rounded-md hover:bg-white/10 transition-colors"
                                onClick={() => router.push('/login?type=login')}
                            >
                                登录
                            </button>
                            <button
                                className="px-4 py-1 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
                                onClick={() => router.push('/login?type=register')}
                            >
                                注册
                            </button>
                        </div>
                    ) : (
                        /* 已登录时显示用户中心下拉菜单 */
                        <Dropdown>
                            <DropdownTrigger>
                                <div className="flex items-center gap-2 cursor-pointer">
                                    <FontAwesomeIcon icon={faUser} className="w-5 h-5 text-white" />
                                    <span className="text-white hidden md:inline">用户中心</span>
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem key="user-center" onPress={() => router.push('/user-center')}>
                                    个人中心
                                </DropdownItem>
                                <DropdownItem key="logonOut" onPress={handleLoginOut}>
                                    退出登录
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    )}
                </div>
            </Navbar >
        </div >
    )
}

export default Header
