'use client'

import React from 'react'

import { useTranslation } from '@/i18n/client'

const Launch: React.FC<{ lang: string }> = ({ lang }) => {
	useTranslation('global', { lng: lang })

	return null
}

export default Launch
