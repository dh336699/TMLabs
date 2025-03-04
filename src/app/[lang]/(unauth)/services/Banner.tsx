'use client'

import Banner from '@/components/Banner'
import { useTranslation } from '@/i18n/client'
import { Button } from '@heroui/react'

const ServicesBanner: React.FC = () => {
	const { t } = useTranslation('services')

	return (
		<Banner image="/assets/services-banner.png">
			<div className="absolute bottom-7 left-1/2 w-full -translate-x-1/2 text-center md:bottom-20">
				<div className="text-title mb-2 text-2xl md:mb-14 md:text-7xl">{t('slogan')}</div>

				<Button
					color="primary"
					variant="bordered"
					radius="none"
					className="bordered-button h-8 w-32 border-1 md:h-[80px] md:w-[400px] md:text-3xl"
				>
					{t('立即定制')}
				</Button>
			</div>
		</Banner>
	)
}

export default ServicesBanner
