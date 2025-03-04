import { classnames } from '@/utils/classnames'
import React, { PropsWithChildren } from 'react'

const Wrapper: React.FC<PropsWithChildren<{ dark?: boolean; className?: string }>> = ({
	children,
	dark = true,
	className,
}) => {
	return (
		<div
			className={classnames(
				dark ? 'text-foreground' : 'bg-foreground text-background',
			)}
		>
			<div className={classnames('wrapper', className)}>{children}</div>
		</div>
	)
}

export default Wrapper
