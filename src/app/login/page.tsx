'use client'
import { useCallback, useEffect, useState } from 'react'
import { addToast, Button } from '@heroui/react'
import Input from '@/components/Input'
import Row from '@/components/Grid/Row';
import Col from '@/components/Grid/Col';
import { httpRequest } from "@/utils/axios"
import { isEmpty, pick } from "lodash"
import { useRouter, useSearchParams } from "next/navigation"
import { classnames } from "@/utils/classnames"

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
    const searchParams = useSearchParams()

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
                    addToast({ title: isLogin ? '登录成功' : '注册成功', color: 'success', timeout: 1000 })
                    router.replace('/user-center')
                    sessionStorage.removeItem('accessmentCompleted')
                } else {
                    addToast({ title: isLogin ? '登录成功' : '注册成功', color: 'success', timeout: 1000 })
                    router.replace('/')
                }
            }
        } catch (error) {
            console.error(error)
        }
    }, [formData, isLogin, router])

    useEffect(() => {
        if (searchParams) {
            const type = searchParams.get('type')
            if (type === 'login') {
                setIsLogin(true)
            } else if (type === 'register') {
                setIsLogin(false)
            }
        }
    }, [searchParams])

    const bgClass = 'bg-[url(/assets/login_bg.webp)] bg-cover bg-center'
    return (
        <div className={classnames('flex items-center w-full h-screen', bgClass)}>
            <div className='container mx-auto'>
                <Row gutter={12} className='w-full'>
                    <Col sm={24} md={12}>
                        <div className="flex flex-col items-center justify-center h-full">
                            <h1 className="text-[52px] font-bold text-white mb-2">MLabs</h1>
                            <p className="text-[24px] text-primary font-medium">
                                全球首个AI交易心理测评平台
                            </p>
                        </div>
                    </Col>
                    <Col sm={24} md={12}>
                        {/* <Image src="/assets/login_bg.webp" /> */}
                        <div className='m-auto w-full max-w-md transition-all bg-white/80 p-8'>
                            <p className="mb-6 text-xl text-primary text-center md:text-2xl font-medium">{isLogin ? '登录' : '注册'}</p>

                            <div className="space-y-6 w-full">
                                {/* 邮箱字段 - 仅注册显示 */}
                                <div className={`transition-all overflow-hidden ${isLogin ? 'max-h-0' : 'max-h-20'}`}>

                                    <Input
                                        label="邮箱"
                                        type="email"
                                        placeholder="请输入邮箱"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        variant="bordered"
                                    />

                                </div>

                                {/* 公共字段 */}
                                <Input
                                    label="用户名"
                                    placeholder="请输入用户名"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    variant="bordered"
                                    required
                                />

                                {!isLogin && (<div className={`transition-all overflow-hidden ${isLogin ? 'max-h-0' : 'max-h-20'}`}>
                                    <Input
                                        label="手机号"
                                        placeholder="请输入手机号"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        required={!isLogin}
                                        disabled={isLogin}
                                    />
                                </div>)}

                                <Input
                                    label="密码"
                                    placeholder="请输入密码"
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    variant="bordered"
                                    required
                                />

                                <Button
                                    type="submit"
                                    color="primary"
                                    fullWidth
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
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}