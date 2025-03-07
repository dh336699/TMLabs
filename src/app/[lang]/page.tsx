'use client'

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// 定义数据类型
interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

interface Article {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

export default function Home() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "王先生",
      role: "股票交易员",
      content: "通过TMLabs的心理分析，我意识到自己交易中的情绪波动问题。经过三个月的心理训练，我的年化收益率提高了23%。",
      avatar: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      name: "李女士",
      role: "外汇交易者",
      content: "TMLabs帮助我克服了交易中的恐惧心理，现在我能够按照既定策略执行交易，不再因为情绪干扰而错失机会。",
      avatar: "https://via.placeholder.com/150"
    },
    {
      id: 3,
      name: "张先生",
      role: "期货交易员",
      content: "实时情绪监控系统真的很神奇，它能够提醒我何时应该暂停交易。这大大减少了我的冲动交易次数。",
      avatar: "https://via.placeholder.com/150"
    }
  ];

  const articles: Article[] = [
    {
      id: 1,
      title: "交易心理学：为什么95%的交易者最终亏损？",
      excerpt: "本研究深入分析了上千名交易者的行为模式，揭示了导致大多数人失败的心理因素...",
      date: "2023-09-15",
      category: "研究报告"
    },
    {
      id: 2,
      title: "情绪如何影响交易决策：神经科学角度解析",
      excerpt: "最新脑科学研究表明，交易时的情绪波动会激活大脑的特定区域，导致决策偏差...",
      date: "2023-08-22",
      category: "科学研究"
    },
    {
      id: 3,
      title: "交易者的五种常见心理偏差及应对策略",
      excerpt: "从认知心理学角度分析交易者常见的思维陷阱，并提供实用的应对方法...",
      date: "2023-07-18",
      category: "交易策略"
    }
  ];

  return (
    <div>
      {/* 英雄区域 */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <motion.div
              className="md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                探索<span className="text-colorPrimary">交易心理</span>的奥秘，<br />掌握持续盈利的关键
              </h1>
              <p className="text-lg text-neutralPrimaryText mb-8 max-w-lg">
                通过科学的心理测评、实时情绪监控与专业训练，帮助交易者克服心理障碍，提升交易表现。
              </p>
              <motion.div
                className="space-x-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/assessment"
                  className="btn-primary px-6 py-3 inline-block"
                >
                  立即开始测评
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://via.placeholder.com/800x600"
                  alt="交易心理分析"
                  width={800}
                  height={600}
                  className="object-cover w-full h-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 特点介绍 */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              我们的<span className="text-red">优势</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              结合心理学、行为金融学和神经科学的前沿研究，精准分析交易行为背后的心理因素
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-lg shadow-md"
            >
              <div className="text-red mb-4">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">科学评估系统</h3>
              <p className="text-gray-600">
                基于行为金融学和心理学最新研究，精准评估交易者情绪波动、认知偏差与风险管理能力。
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-lg shadow-md"
            >
              <div className="text-red mb-4">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">实时情绪监控</h3>
              <p className="text-gray-600">
                通过AI技术分析交易过程中的情绪波动，及时预警潜在的情绪干扰，避免冲动决策。
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-lg shadow-md"
            >
              <div className="text-red mb-4">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">个性化提升方案</h3>
              <p className="text-gray-600">
                根据您的交易风格与心理特质，提供专业的心理训练计划，逐步改善交易心态。
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 成功案例 */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-6 text-white">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              成功案例
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              来自真实用户的心得体会，看看他们如何通过TMLabs改变交易表现
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-darkBg p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-white">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-white/80">{testimonial.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 最新研究 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              最新<span className="text-red">研究</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              探索交易心理与行为金融学的前沿研究成果，获取实用的交易心理知识
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-lg overflow-hidden shadow-md"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs text-red font-semibold px-2 py-1 bg-red-50 rounded">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500">{article.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 hover:text-red transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">{article.excerpt}</p>
                  <a href="#" className="text-red font-semibold hover:underline inline-flex items-center">
                    阅读更多
                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 号召行动 */}
      <section className="py-16 bg-red text-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              准备好提升您的交易表现了吗？
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              立即开始心理测评，发现影响你交易表现的核心因素，获取个性化改进方案。
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/assessment"
                className="inline-block px-8 py-4 bg-white text-red font-bold rounded-lg shadow-lg hover:bg-gray-100 transition-colors duration-300 transform"
              >
                开始测评
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 