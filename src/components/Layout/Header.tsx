'use client'

import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'

import { faUser, faHome, faClipboardCheck, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [hasToken, setHasToken] = useState(false);
    const router = useRouter()
    const pathname = usePathname()
    const { data, setData } = useContext(GlobalContext)

    // 判断菜单是否激活
    const isHomeActive = pathname === '/'
    const isAssessmentActive = pathname === '/assessment' || pathname.startsWith('/assessment/')

    // 切换移动菜单开关
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    // 处理导航
    const handleNavigation = (path: string) => {
        router.push(path)
        // 关闭移动端菜单
        setMobileMenuOpen(false)
    }

    // 处理登出
    const handleLogout = () => {
        localStorage.removeItem('token')
        setHasToken(false)
        router.push('/login')
        setMobileMenuOpen(false)
    }
    const handleLoginOut = useCallback(() => {
        setData({ ...data, token: undefined })
        router.push('/login')
    }, [])

    useEffect(() => {
        setHasToken(!!data.token);
    }, [data.token]);

    // 当路由改变时关闭移动菜单
    useEffect(() => {
        setMobileMenuOpen(false)
    }, [pathname]);

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
                {/* 移动端菜单按钮 */}
                <div className="md:hidden flex items-center justify-center z-20">
                    <button
                        className="text-white p-2"
                        onClick={toggleMobileMenu}
                        aria-label={mobileMenuOpen ? "关闭菜单" : "打开菜单"}
                    >
                        <FontAwesomeIcon
                            icon={mobileMenuOpen ? faTimes : faBars}
                            className="w-5 h-5"
                        />
                    </button>
                </div>

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

                {/* 导航菜单 - 桌面版 */}
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
            </Navbar>

            {/* 移动端菜单 - 抽屉式侧边栏 */}
            {/* 背景遮罩 */}
            <div
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={toggleMobileMenu}
            ></div>

            {/* 侧边菜单 */}
            <div
                className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-black/95 z-50 transform transition-transform duration-300 ease-in-out md:hidden overflow-auto ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex flex-col p-5">
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-xl font-bold text-primary">TMLabs</div>
                        <button
                            className="text-white"
                            onClick={toggleMobileMenu}
                        >
                            <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
                        </button>
                    </div>

                    {/* 菜单项 */}
                    <div className="py-2">
                        <div
                            className={`flex items-center gap-3 px-3 py-4 rounded-md cursor-pointer ${isHomeActive ? 'text-primary bg-primary/10' : 'text-white'
                                }`}
                            onClick={() => handleNavigation('/')}
                        >
                            <FontAwesomeIcon icon={faHome} className="w-5 h-5" />
                            <span>首页</span>
                        </div>

                        <div
                            className={`flex items-center gap-3 px-3 py-4 rounded-md cursor-pointer ${isAssessmentActive ? 'text-primary bg-primary/10' : 'text-white'
                                }`}
                            onClick={() => handleNavigation('/assessment')}
                        >
                            <FontAwesomeIcon icon={faClipboardCheck} className="w-5 h-5" />
                            <span>开始测评</span>
                        </div>
                    </div>

                    {/* 分隔线 */}
                    <div className="h-px bg-gray-800 my-4"></div>

                    {/* 账户菜单 */}
                    <div className="py-2">
                        {!hasToken ? (
                            <>
                                <div
                                    className="flex items-center justify-center p-3 mb-3 border border-white rounded-md text-white cursor-pointer"
                                    onClick={() => handleNavigation('/login?type=login')}
                                >
                                    登录
                                </div>
                                <div
                                    className="flex items-center justify-center p-3 bg-primary rounded-md text-white cursor-pointer"
                                    onClick={() => handleNavigation('/login?type=register')}
                                >
                                    注册
                                </div>
                            </>
                        ) : (
                            <>
                                <div
                                    className="flex items-center gap-3 px-3 py-4 rounded-md text-white cursor-pointer"
                                    onClick={() => handleNavigation('/user-center')}
                                >
                                    <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
                                    <span>个人中心</span>
                                </div>
                                <div
                                    className="flex items-center gap-3 px-3 py-4 rounded-md text-white cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    <span>退出登录</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
