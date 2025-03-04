const Main: React.FC<React.PropsWithChildren<{ banner: React.ReactNode }>> = ({
	children,
	banner,
}) => {
	return (
		<main className="relative w-full">
			{banner ? banner : null}
			<div className="relative">{children}</div>
		</main>
	)
}

export default Main
