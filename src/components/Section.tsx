'use client'

import Image from 'next/image'

import Wrapper from '@/components/Layout/Wrapper'
import { useMemo } from 'react'
import { classnames } from '@/utils/classnames'

const Section: React.FC<{ data: I18nObject; dark?: boolean }> = ({ data, dark = false }) => {
	const border = useMemo(
		() => (dark ? 'border-b-foreground/10' : 'border-b-background/10'),
		[dark],
	)
	return (
		<>
			<Wrapper dark={dark}>
				{data.cover ? (
					<div className="text-title mb-5 text-2xl text-primary md:text-[40px]">
						{data.title}
					</div>
				) : (
					<div className="text-center md:mb-16">
						<div className="text-title mb-8 inline-block border-b-4 border-primary pb-2 text-2xl md:text-4xl">
							{data.title}
						</div>
					</div>
				)}

				<div
					className={classnames(
						'flex flex-col md:flex-row',
						data.cover ? 'gap-7 md:gap-[100px]' : 'gap-12',
					)}
				>
					{data.cover ? (
						<>
							<Image
								alt={data.title}
								src={data.cover}
								width={720}
								height={380}
							/>
							<div className="mt-2 flex flex-1 flex-col text-lg md:mt-0">
								<div className={classnames('h-16 border-b-1 text-xl', border)}>
									{data.description}
								</div>
								{data.items?.map((item, idx) => (
									<div
										key={item.title}
										className={classnames(
											'items-center gap-4 border-b-1 py-4',
											border,
										)}
									>
										<div className="mb-4 flex items-center text-lg">
											<div className="text-title w-6">{idx + 1}</div>
											<div className="md:text-lg">{item.title}</div>
										</div>
										<div className="text-sm md:text-medium">
											{item.description[0]}
										</div>
									</div>
								))}
							</div>
						</>
					) : (
						data.items?.map((item, idx) => (
							<div
								key={item.title}
								className={classnames(
									'mx-10 flex-1 items-center gap-4 px-12 py-10 md:mx-0',
									dark ? 'bg-foreground/10' : 'bg-background/5',
								)}
							>
								<div className="mb-6 flex h-14 items-center text-lg">
									<div className="text-title mr-1 w-6 text-4xl text-primary">
										{idx + 1}
									</div>
									<div className="md:text-lg">{item.title}</div>
								</div>
								<div className="text-sm leading-6 opacity-80 md:text-medium md:leading-8">
									{item.description[0]}
								</div>
							</div>
						))
					)}
				</div>
			</Wrapper>
		</>
	)
}

export default Section
