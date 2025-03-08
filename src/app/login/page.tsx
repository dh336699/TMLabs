'use client'
import { useCallback, useContext, useState } from 'react'
import { Button, Input, Card, CardBody, CardHeader, Image } from '@heroui/react'
import { httpRequest } from "@/utils/axios"
import { isEmpty, pick } from "lodash"
import { useRouter } from "next/navigation"
import { toast } from 'react-toastify'
import { createBehaviorDiagram, postAnswer } from "@/api/questions"
import { classnames } from "@/utils/classnames"
import { downloadFile } from "@/utils/download"

interface IUserInfo {
    avatar: string; email: string; id: number; nickname: string; phone: number;
}

type RequestDTO = {
    message?: string; token: string; userId?: number;
    userInfo: IUserInfo
}

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
    })
    const router = useRouter()

    const generateReport = async () => {
        try {
            const answers = localStorage.getItem('answers') ? JSON.parse(localStorage.getItem('answers') as string) : []
            if (isEmpty(answers)) {
                toast.error('答案为空, 需要重新答题哦', { onClose: () => router.replace('/') })
            } else {
                await postAnswer(answers)
                const res = await createBehaviorDiagram()
                toast.success(res.message, { onClose: () => downloadFile({ url: res.download_url }) })
                router.replace('/user-center')
            }
        } catch (error) {
            toast.error('生成失败，请在个人中心重新生成', { onClose: () => router.replace('/user-center') })
        }
    }

    const handleSubmit = useCallback(async () => {
        let res: RequestDTO | undefined = undefined
        try {
            if (isLogin) {
                res = await httpRequest<RequestDTO>('/auth/login', { data: pick(formData, ['username', 'password']), method: 'POST' })
            } else {
                res = await httpRequest<RequestDTO>('/auth/register', { data: formData, method: 'POST' })

            }
            if (!isEmpty(res) && res.token) {
                localStorage.setItem('token', res.token)
                // 答题时跳过来登录，登录成功后生成报告然后直接跳转到用户中心
                if (sessionStorage.getItem('accessmentCompleted')) {
                    toast.success('登录成功, 正在生成交易习惯分析报告', { onClose: generateReport, delay: 1000 })
                } else {
                    toast.success(isLogin ? '登录成功' : '注册成功', { onClose: () => router.replace('/') })
                }
            }
        } catch (error) {
            console.error(error)
        }
    }, [formData, isLogin])

    const bgClass = 'bg-[url(/assets/login_bg.webp)] bg-cover bg-center'
    return (
        <div className={classnames('flex justify-center items-center w-screen gap-12 sm:flex-col md:flex-row h-screen', bgClass)}>
            <div className="text-center">
                <h1 className="text-3xl font-bold text-white mb-2">MLabs</h1>
                <p className="text-md text-primary">
                    全球首个AI交易心理测评平台
                </p>
            </div>
            {/* <Image src="/assets/login_bg.webp" /> */}
            <Card className="w-full max-w-md transition-all">
                <CardHeader className="flex space-x-4 border-b">
                    <p className="text-xl text-primary md:text-xl">{isLogin ? '注册' : '登录'}</p>
                </CardHeader>

                <CardBody>
                    <div className="space-y-4 w-full">
                        {/* 邮箱字段 - 仅注册显示 */}
                        <div className={`transition-all overflow-hidden ${isLogin ? 'max-h-0' : 'max-h-20'}`}>

                            <Input
                                label="邮箱"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />

                        </div>

                        {/* 公共字段 */}
                        <Input
                            label="用户名"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                        />

                        <div className={`transition-all overflow-hidden ${isLogin ? 'max-h-0' : 'max-h-20'}`}>
                            <Input
                                label="手机号"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required={!isLogin}
                                disabled={isLogin}
                            />
                        </div>

                        <Input
                            label="密码"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />

                        <Button
                            type="submit"
                            color="primary"
                            fullWidth
                            className="mt-6"
                            onPress={handleSubmit}
                        >
                            {isLogin ? '立即登录' : '立即注册'}
                        </Button>

                        <div className="gap-4 flex justify-center items-center text-sm text-gray-600 mt-4">
                            {isLogin ? '没有账号？' : '已有账号？'}
                            <p
                                onClick={() => setIsLogin(!isLogin)}
                                className="ml-2 text-blue-600 cursor-pointer"
                            >
                                {isLogin ? '注册新账号' : '直接登录'}
                            </p>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}