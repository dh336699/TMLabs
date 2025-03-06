'use client'
import { Card, Avatar, Button, Divider } from '@heroui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faPlus, faBook } from '@fortawesome/free-solid-svg-icons'

export default function ProfilePage() {
    const stats = [
        { label: '关注', value: '2.3k' },
        { label: '粉丝', value: '1.8k' }
    ]

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
            {/* 个人信息头部 */}
            <Card className="mb-6">
                <div className="flex flex-col sm:flex-row items-center gap-6 p-4">
                    <Avatar
                        src="/avatar.jpg"
                        className="w-24 h-24 text-3xl"
                        name="User"
                    />

                    <div className="flex-1 text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                            <h1 className="text-2xl font-bold">前端开发者小明</h1>
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
                        <p className="text-sm text-gray-500 mt-2">参考案例：资深前端工程师 | 开源爱好者</p>
                    </div>
                </div>
            </Card>

            {/* 知识库区块 */}
            <Card>
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-4">知识库</h2>
                    <Divider className="mb-4" />
                    <div className="min-h-[200px] flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4">
                        <Button
                            color="primary"
                            variant="bordered"
                            className="text-blue-600"
                        >
                            <FontAwesomeIcon icon={faBook} className="mr-2" />
                            添加公开知识库
                        </Button>
                        <p className="text-sm text-gray-500 mt-2">从现有仓库导入或新建知识库</p>
                    </div>
                </div>
            </Card>
        </div>
    )
}