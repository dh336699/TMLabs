'use client'

import { useMemo } from 'react'

import Wrapper from '@/components/Layout/Wrapper'
import Section from '@/components/Section'
import { useTranslation } from '@/i18n/client'
import Image from 'next/image'

const Content: React.FC = () => {
	const { t } = useTranslation('services')
	const { flow, example } = useMemo(
		() => ({
			flow: t('flow', { returnObjects: true }) as I18nObject,
			example: t('case', { returnObjects: true }) as I18nObject,
		}),
		[t],
	)

	return (
		<>
			<Section
				dark
				data={flow}
			/>
			<Wrapper dark={false}>
				<div className="text-title mb-4 text-2xl text-primary md:mb-8 md:text-[40px]">
					{example.title}
				</div>
				<div className="flex flex-col justify-between gap-4 md:flex-row">
					<Image
						src="/assets/services-1.png"
						width={738}
						height={380}
						alt="service example 1"
					/>
					<Image
						src="/assets/services-2.png"
						width={738}
						height={380}
						alt="service example 2"
					/>
				</div>
			</Wrapper>
		</>
	)
}

export default Content
