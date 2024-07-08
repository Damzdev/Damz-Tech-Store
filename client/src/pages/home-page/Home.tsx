import Carousel from './Carousel'
import AmdCard from './product-cards/Amd-card'
import GamingChairCard from './product-cards/GamingChair-card'
import MonitorCard from './product-cards/Monitor-card'
import NewLaptopCard from './product-cards/NewLaptop-card'
import NvidiaCard from './product-cards/Nvidia-card'
import Intelproducts from './Productbannerlinks'

export default function Home() {
	return (
		<main>
			<Carousel />
			<ul className="flex flex-wrap bg-white ">
				<AmdCard />
				<GamingChairCard />
				<MonitorCard />
				<NewLaptopCard />
				<NvidiaCard />
			</ul>
			<Intelproducts />
		</main>
	)
}
