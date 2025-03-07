'use client'

import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-black text-white">
            <div className="container mx-auto px-6 py-10">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-6 md:mb-0">
                        <h2 className="text-2xl font-bold text-red mb-4">TMLabs</h2>
                        <p className="text-gray max-w-xs">
                            专注于交易心理分析，帮助交易者克服心理障碍，实现持续盈利。
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-white font-semibold mb-3">关于我们</h3>
                            <ul className="space-y-2">
                                <li><Link href="/" className="text-gray hover:text-red transition-colors">公司简介</Link></li>
                                <li><Link href="/" className="text-gray hover:text-red transition-colors">团队介绍</Link></li>
                                <li><Link href="/" className="text-gray hover:text-red transition-colors">研究成果</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold mb-3">产品服务</h3>
                            <ul className="space-y-2">
                                <li><Link href="/assessment" className="text-gray hover:text-red transition-colors">交易心理测评</Link></li>
                                <li><Link href="/" className="text-gray hover:text-red transition-colors">情绪监控系统</Link></li>
                                <li><Link href="/" className="text-gray hover:text-red transition-colors">交易风格分析</Link></li>
                            </ul>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <h3 className="text-white font-semibold mb-3">联系我们</h3>
                            <ul className="space-y-2">
                                <li className="text-gray">邮箱：contact@tmlabs.com</li>
                                <li className="text-gray">电话：400-123-4567</li>
                                <li className="flex space-x-4 mt-4">
                                    <a href="#" className="text-gray hover:text-red">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 22 5.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.073 4.073 0 0 1 2.8 9.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.093 4.093 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 2 18.407a11.615 11.615 0 0 0 6.29 1.84" />
                                        </svg>
                                    </a>
                                    <a href="#" className="text-gray hover:text-red">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 0 1 1.772 1.153 4.902 4.902 0 0 1 1.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 0 1-1.153 1.772 4.902 4.902 0 0 1-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 0 1-1.772-1.153 4.902 4.902 0 0 1-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 0 1 1.153-1.772A4.902 4.902 0 0 1 5.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 1.802a3.333 3.333 0 1 0 0 6.666 3.333 3.333 0 0 0 0-6.666zm5.338-3.205a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    <a href="#" className="text-gray hover:text-red">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M22.092 7.15c-.255-1.005-1.005-1.755-2.01-2.01C18.332 4.622 12 4.622 12 4.622s-6.332 0-8.082.518c-1.005.255-1.755 1.005-2.01 2.01C1.39 8.832 1.39 12 1.39 12s0 3.168.518 4.85c.255 1.005 1.005 1.755 2.01 2.01 1.75.518 8.082.518 8.082.518s6.332 0 8.082-.518c1.005-.255 1.755-1.005 2.01-2.01.518-1.75.518-4.85.518-4.85s0-3.168-.518-4.85z" />
                                            <path d="M9.709 15.284V8.716L15.523 12l-5.814 3.284z" fill="#000" />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray">
                    <p>&copy; {new Date().getFullYear()} TMLabs. 保留所有权利。</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 