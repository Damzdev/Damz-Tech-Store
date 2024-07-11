import React, { useState, useEffect } from 'react'
import image1 from '../../assets/Carousel/Laptop-Deals-Slider-Banner-2560px-v01.png'
import image2 from '../../assets/Carousel/Intel-StarWars-Outlwas-slider-banner-2560px-v1.png'
import image3 from '../../assets/Carousel/choose-2-games-with-amd-radeon-graphics-2560px-v2.png'

type CarouselItemProps = {
	imageSrc: string
	link: string
}

const CarouselItem: React.FC<CarouselItemProps> = ({ imageSrc, link }) => (
	<a href={link} className="min-w-full h-full flex justify-center items-center">
		<img
			src={imageSrc}
			alt="Carousel Item"
			className="w-full h-full object-cover"
		/>
	</a>
)

const Carousel: React.FC = () => {
	const [activeIndex, setActiveIndex] = useState(0)
	const items = [
		{ imageSrc: image1, link: '/gaming-laptops' },
		{ imageSrc: image2, link: '/components/intel-processors' },
		{ imageSrc: image3, link: '/components/radeon-cards' },
	]

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveIndex((prevIndex) => (prevIndex + 1) % items.length)
		}, 6000) // Change item every 3 seconds

		return () => clearInterval(interval)
	}, [items.length])

	return (
		<div className="relative w-full max-w-screen-2xl mx-auto overflow-hidden">
			<div
				className="flex transition-transform duration-500"
				style={{ transform: `translateX(-${activeIndex * 100}%)` }}
			>
				{items.map((item, index) => (
					<CarouselItem key={index} imageSrc={item.imageSrc} link={item.link} />
				))}
			</div>
			<div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
				{items.map((_, index) => (
					<div
						key={index}
						className={`w-4 h-4 bg-gray-300 rounded-full cursor-pointer transition-colors ${
							index === activeIndex ? 'bg-gray-700' : ''
						}`}
						onClick={() => setActiveIndex(index)}
					></div>
				))}
			</div>
		</div>
	)
}

export default Carousel
