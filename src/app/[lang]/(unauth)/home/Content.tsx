'use client'

import Image from 'next/image'
import { useMemo } from 'react'

import Wrapper from '@/components/Layout/Wrapper'
import { useTranslation } from '@/i18n/client'

const Content: React.FC = () => {
	const { t } = useTranslation('home')
	const { service, superiority } = useMemo(
		() => ({
			superiority: t('superiority', { returnObjects: true }) as I18nObject,
			service: t('service', { returnObjects: true }) as I18nObject,
		}),
		[t],
	)

	return (
		<>
			<Wrapper dark={false}>
				<div className="text-title mb-8 text-[40px] text-primary">{service.title}</div>
				<div className="mb-16 leading-8 opacity-80">{service.description[0]}</div>
				<div className="flex flex-col justify-between gap-9 md:flex-row">
					{service.items?.map((item) => (
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

			<Wrapper>
				<div className="mb-16 text-center">
					<div className="text-title mx-auto mb-8 inline-block border-b-4 border-primary text-[40px]">
						{superiority.title}
					</div>
				</div>
				<div className="flex flex-col gap-[100px] md:flex-row">
					<Image
						alt={superiority.title}
						src={superiority.cover!}
						width={720}
						height={380}
					/>
					<div className="mt-2 flex flex-col text-lg md:mt-0">
						{superiority.description.map((str) => (
							<div
								key={str}
								className="border-b border-b-foreground/10 leading-[96px]"
							>
								{str}
							</div>
						))}
					</div>
				</div>
			</Wrapper>
		</>
	)
}

export default Content
