'use client'

import Image from 'next/image'
import { useMemo } from 'react'

import Wrapper from '@/components/Layout/Wrapper'
import { useTranslation } from '@/i18n/client'

const Content: React.FC = () => {
	const { t } = useTranslation('courses')
	const { courses } = useMemo(
		() => ({
			courses: t('courses', { returnObjects: true }) as I18nObject,
			example: t('case', { returnObjects: true }) as I18nObject,
		}),
		[t],
	)

	return (
		<>
			<Wrapper dark={false}>
				<div className="text-title mb-8 text-[40px] text-primary">{courses.title}</div>
				<div className="mb-16 leading-8 opacity-80">{courses.description[0]}</div>
				<div className="flex flex-col justify-between gap-9 md:flex-row">
					{courses.items?.map((item) => (
						<div
							key={item.title}
							className="mt-3 md:mt-0 md:w-[480px]"
						>
							<Image
								alt={item.title}
								src={item.cover!}
								width={480}
								height={300}
								className="w-full"
							/>
							<div className="my-5 text-sm md:text-lg">{item.title}</div>
							{item.description.map((str) => (
								<div
									key={str}
									className="text-sm leading-8 text-background/60"
								>
									{str}
								</div>
							))}
						</div>
					))}
				</div>
			</Wrapper>
		</>
	)
}

export default Content
