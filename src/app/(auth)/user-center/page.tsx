'use client'
import { Card, Avatar, Button, Listbox, ListboxItem, addToast } from '@heroui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faPlus } from '@fortawesome/free-solid-svg-icons'
import { IReportItem, useReportList } from "@/api/user-center"
import { isEmpty } from "lodash"
import { downloadFile } from "@/utils/download"
import { useContext, useEffect } from "react"
import { GlobalContext } from "@/app/GlobalContexrProvider"

export default function ProfilePage() {
    const stats = [
        { label: '关注', value: '2.3k' },
        { label: '粉丝', value: '1.8k' }
    ]

    const { setData } = useContext(GlobalContext)

    const { data: reports } = useReportList()

    const handleDownload = async (report: IReportItem) => {
        const url = `/survey/reports/${report.id}/download`
        addToast({ title: '正在下载中' })
        downloadFile({ url, cors: true })
    }

    useEffect(() => {
        if (!isEmpty(reports)) {
            setData({ reports: reports.data })
        }
    }, [reports, setData])

    return (
        <div className="md:w-[80vw] mx-auto p-4 sm:p-6">
            {/* 个人信息头部 */}
            <Card className="mb-6">
                <div className="flex flex-col sm:flex-row items-center gap-6 p-4">
                    <Avatar
                        src="/assets/avatar.jpg"
                        className="w-24 h-24 text-3xl"
                        name="User"
                    />

                    <div className="flex-1 text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                            <h1 className="text-2xl font-bold">港美交易者</h1>
                            <FontAwesomeIcon
                                icon={faLock}
                                className="text-gray-500 text-sm"
                            />
                        </div>

                        <div className="flex justify-center sm:justify-start gap-6">
                            {stats.map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <p className="text-lg font-semibold">{stat.value}</p>
                                    <p className="text-gray-600 text-sm">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>

            {/* 个人介绍区块 */}
            <Card className="mb-6">
                <div className="p-4">
                    <div className="min-h-[120px] flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4">
                        <Button
                            variant="ghost"
                            className="text-gray-500 hover:text-blue-600"
                        >
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            添加个人介绍
                        </Button>
                    </div>
                </div>
            </Card>

            <div>
                <p className="text-l text-medium mb-3">报告列表</p>
                <Card className="mb-6 p-2">
                    {reports && !isEmpty(reports.data) ? <Listbox shouldHighlightOnFocus={false} aria-label="Actions">
                        {
                            reports && reports.data!.map(report => <ListboxItem key={report.id}>
                                <div className="flex items-center">
                                    <p className="mr-2 text-sm ">{report.report_name}</p>
                                    <Button color="primary" variant="light" size="sm" onPress={() => handleDownload(report)}>
                                        点击下载
                                    </Button>
                                </div></ListboxItem>)
                        }
                    </Listbox> : <p>暂无</p>}
                </Card>
            </div>
        </div>
    )
}