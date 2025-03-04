'use client'

import Banner from '@/components/Banner'
import { useTranslation } from '@/i18n/client'
import { Button } from '@heroui/react'

const ProductsBanner: React.FC = () => {
	const { t } = useTranslation('products')

	return (
		<Banner image="/assets/products-banner.png">
			<div className="absolute bottom-7 left-1/2 w-full -translate-x-1/2 text-center md:bottom-20">
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

export default ProductsBanner
