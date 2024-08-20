import Carousel from './Carousel'
import AmdCard from './product-cards/Amd-card'
import GamingChairCard from './product-cards/GamingChair-card'
import MonitorCard from './product-cards/Monitor-card'
import NewLaptopCard from './product-cards/NewLaptop-card'
import NvidiaCard from './product-cards/Nvidia-card'
import Loader from '../../components/Loader'
import Productbannerlinks from './Productbannerlinks'
import Cards from '../../components/Cards'

export default function Home() {
	return (
		<main className="bg-gray-300">
			<Loader />
			<Carousel />
			<ul className="flex flex-wrap bg-white">
				<AmdCard />
				<GamingChairCard />
				<MonitorCard />
				<NewLaptopCard />
				<NvidiaCard />
				<Cards />
			</ul>
			<Productbannerlinks />
		</main>
	)
}
