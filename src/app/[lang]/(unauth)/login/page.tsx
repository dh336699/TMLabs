'use client'
import { useCallback, useState } from 'react'
import { Button, Input, Card, CardBody, CardHeader, Form } from '@heroui/react'
import { httpRequest } from "@/utils/axios"
import { isEmpty } from "lodash"
import { redirect, useRouter } from "next/navigation"

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

    const handleSubmit = useCallback(async () => {
        let res: RequestDTO | undefined = undefined
        try {
            if (isLogin) {
                res = await httpRequest<RequestDTO>('/auth/login', { data: formData, method: 'POST' })
            } else {
                res = await httpRequest<RequestDTO>('/auth/register', { data: formData, method: 'POST' })

            }
            if (!isEmpty(res) && res.token) {
                localStorage.setItem('token', res.token)
                alert(isLogin ? '登录成功' : '注册成功')
                setTimeout(() => {
                    router.replace('/')
                }, 300)
            }
        } catch (error) {
            console.error(error)
        }
    }, [formData, isLogin])

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-md transition-all">
                <CardHeader className="flex space-x-4 border-b">
                    <p className="text-xl text-primary md:text-xl">交易心理测评系统</p>
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

                        <div className="text-center text-sm text-gray-600 mt-4">
                            {isLogin ? '没有账号？' : '已有账号？'}
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsLogin(!isLogin)}
                                className="ml-2 text-blue-600"
                            >
                                {isLogin ? '注册新账号' : '直接登录'}
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}