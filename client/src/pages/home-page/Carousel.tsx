import React, { useState, useEffect } from 'react'
import '../../styles/carousel.css'
import image1 from '../../assets/Carousel/Laptop-Deals-Slider-Banner-2560px-v01.png'
import image2 from '../../assets/Carousel/Intel-StarWars-Outlwas-slider-banner-2560px-v1.png'
import image3 from '../../assets/Carousel/choose-2-games-with-amd-radeon-graphics-2560px-v2.png'

interface CarouselItemProps {
	imageSrc: string
	link: string
}

const CarouselItem: React.FC<CarouselItemProps> = ({ imageSrc, link }) => (
	<a href={link} className="carousel-item">
		<img src={imageSrc} alt="Carousel Item" />
	</a>
)

const Carousel: React.FC = () => {
	const [activeIndex, setActiveIndex] = useState(0)
	const items = [
		{ imageSrc: image1, link: '/gaming-laptops' },
		{ imageSrc: image2, link: '/gaming-computers/geforce' },
		{ imageSrc: image3, link: '/intel-cpu' },
	]

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveIndex((prevIndex) => (prevIndex + 1) % items.length)
		}, 6000) // Change item every 3 seconds

		return () => clearInterval(interval)
	}, [items.length])

	return (
		<div className="carousel">
			<div
				className="carousel-content"
				style={{ transform: `translateX(-${activeIndex * 100}%)` }}
			>
				{items.map((item, index) => (
					<CarouselItem key={index} imageSrc={item.imageSrc} link={item.link} />
				))}
			</div>
			<div className="carousel-indicators">
				{items.map((_, index) => (
					<div
						key={index}
						className={`indicator ${index === activeIndex ? 'active' : ''}`}
						onClick={() => setActiveIndex(index)}
					></div>
				))}
			</div>
		</div>
	)
}

export default Carousel
