import Main from '@/components/Layout/Main'

import Banner from './Banner'
import Services from './Content'

export default function ServicesPage() {
	return (
		<Main banner={<Banner />}>
			<Services />
		</Main>
	)
}
