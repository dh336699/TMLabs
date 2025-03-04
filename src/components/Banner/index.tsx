'use client'

import React, { useMemo } from 'react'

import styles from './styles.module.scss'
import { classnames } from '@/utils/classnames'

const Banner: React.FC<React.PropsWithChildren<{ image?: string; extraImage?: string }>> = ({
	image,
	extraImage,
	children,
}) => {
	const background = useMemo(() => {
		return {
			main: {
				background: `url(${image}) no-repeat center center / cover`,
			},
			extra: {
				background: `url(${extraImage}) no-repeat center center / cover`,
			},
		}
	}, [extraImage, image])

	return (
		<div className="sticky top-[100px] h-48 md:h-[760px]">
			{extraImage ? (
				<div
					style={background.extra}
					className={classnames(
						'absolute left-0 top-0 h-full w-full',
						styles['overlay-extra'],
					)}
				/>
			) : null}
			<div
				style={background.main}
				className={classnames(
					'absolute left-0 top-0 h-full w-full',
					styles['overlay-main'],
				)}
			/>
			{children}
		</div>
	)
}

export default Banner
