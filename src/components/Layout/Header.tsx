'use client'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import { faBars, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    Navbar,
    NavbarBrand,
    Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button,
    useDisclosure, Tooltip,
    addToast
} from '@heroui/react'
import { IReportDTO, IReportItem } from "@/api/user-center"
import { isEmpty } from "lodash"
import { downloadFile } from "@/utils/download"
import { useCallback, useContext, useEffect, useState } from "react"
import { httpRequest } from "@/utils/axios"
import { GlobalContext } from "@/app/GlobalContexrProvider"

const Header = () => {
    const { isOpen, onOpenChange, onClose } = useDisclosure()
    const router = useRouter()
    const { data: { reports } } = useContext(GlobalContext)
    console.log(reports);

    const handleDownload = async (report: IReportItem) => {
        const url = `/survey/reports/${report.id}/download`
        addToast({ title: '正在下载中' })
        downloadFile({ url, cors: true })
    }

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
                {
                    !isEmpty(reports) ? <Dropdown>
                        <DropdownTrigger>
                            <FontAwesomeIcon icon={faBars} className="w-5 h-5 text-white cursor-pointer" />
                        </DropdownTrigger>
                        <DropdownMenu>
                            {
                                reports!.map(report => (
                                    <DropdownItem key={report.id} onPress={() => handleDownload(report)}>
                                        {report.report_name}
                                    </DropdownItem>
                                )) ?? []
                            }
                        </DropdownMenu>
                    </Dropdown> : null
                }
                {
                    <Dropdown>
                        <DropdownTrigger>
                            <FontAwesomeIcon icon={faUser} className="w-5 h-5 text-white cursor-pointer" />
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem key="assessment" onPress={() => router.push('/assessment')}>开始测评</DropdownItem>
                            {
                                localStorage.getItem('token') ? <DropdownItem key="user-center" onPress={() => router.push('/user-center')}>个人中心</DropdownItem> : null
                            }
                            {
                                !localStorage.getItem('token') ? <><DropdownItem key="login" onPress={() => router.push('/login?type=login')}>登录</DropdownItem>
                                    <DropdownItem key="register" onPress={() => router.push('/login?type=register')}>注册</DropdownItem></> : null
                            }
                            {
                                localStorage.getItem('token') ? <DropdownItem key="logonOut" onPress={() => {
                                    localStorage.removeItem('token')
                                    router.push('/login')
                                }}>
                                    退出登录
                                </DropdownItem> : null
                            }
                        </DropdownMenu>
                    </Dropdown>
                }
            </Navbar>
        </div>
    )
}

export default Header
