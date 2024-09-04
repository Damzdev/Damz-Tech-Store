import { useQuery } from 'react-query'
import Slider from 'react-slick'
import cartIcon from '../assets/cart/shopping-cart.png'
import { formatPrice } from '../utils/formatCurrency'
import { truncateText } from '../utils/truncateText'
import { useShoppingCart } from '../context/ShoppingCartContext'
import axios from 'axios'
import { useState, useEffect } from 'react'
import AddedItem from './ItemAddedNotification'
import { queryConfig } from '../utils/queryConfig'

interface CardData {
	id: string | number
	name: string
	ImageURL: string
	price: number
}

const fetchComponentDeals = async (): Promise<CardData[]> => {
	const response = await axios.get<CardData[]>(
		'https://damz-tech-store-api.onrender.com/api/component-deals'
	)
	return response.data
}

const getRandomSubset = (arr: CardData[], num: number): CardData[] => {
	return [...arr].sort(() => 0.5 - Math.random()).slice(0, num)
}

export default function Cards(): JSX.Element {
	const { increaseCartQuantity } = useShoppingCart()
	const [showToast, setShowToast] = useState(false)
	const [toastMessage, setToastMessage] = useState('')
	const [randomSubset, setRandomSubset] = useState<CardData[]>([])

	const { data, isLoading, isError } = useQuery<CardData[], Error>(
		'componentDeals',
		fetchComponentDeals,
		queryConfig
	)

	// Set randomSubset only when data is initially fetched
	useEffect(() => {
		if (data) {
			setRandomSubset(getRandomSubset(data, 14))
		}
	}, [data])

	const handleAddToCart = (productId: string | number) => {
		increaseCartQuantity(productId.toString())
		setToastMessage('Item added to cart!')
		setShowToast(true)
	}

	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToScroll: 4,
		slidesToShow: 4,
		responsive: [
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			},
		],
	}

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (isError) {
		return <div>Error fetching data</div>
	}

	if (!randomSubset || randomSubset.length === 0) {
		return <div>No data available</div>
	}

	return (
		<div className="bg-gray-300 rounded-lg h-[464px] mt-4 max-500:m-4 max-500:h-[420px]">
			<div className="text-black mb-10 font-bold text-xl flex rounded-t-lg items-center bg-[#71757A] p-4">
				<div className="flex-grow text-2xl text-transparent bg-gradient-to-r from-orange-500 via-red-600 to-orange-600 bg-clip-text max-500:text-base">
					Mega Component Deals
				</div>
			</div>
			<div className="justify-center items-center space-x-4 px-14 max-w-[1000px] max-500:max-w-[450px] max-500:px-3">
				<Slider {...settings}>
					{randomSubset.map((card) => (
						<div
							key={card.id}
							className="w-48 bg-black rounded-lg flex flex-col h-80 max-500:max-h-1"
						>
							<div className="w-full h-40 flex-shrink-0">
								<img
									src={card.ImageURL}
									alt={card.name}
									className="w-full h-full"
								/>
							</div>
							<div className="p-2 flex flex-col flex-grow">
								<h3 className="font-bold text-white text-xs mb-2 h-8 overflow-hidden">
									{card.name
										? truncateText(card.name, 20)
										: 'No name available'}
								</h3>
								<div className="flex-grow"></div>
								<p className="text-2xl font-bold text-cyan-300 overflow-hidden text-ellipsis text-center mb-2">
									{formatPrice(card.price)}
								</p>
							</div>
							<button
								className="bg-lime-300 text-white px-4 py-2 hover:bg-lime-500 flex justify-center items-center w-full"
								onClick={() => handleAddToCart(card.id)}
							>
								<img src={cartIcon} alt="Add to cart" className="w-7" />
							</button>
						</div>
					))}
				</Slider>
			</div>
			<AddedItem
				show={showToast}
				onClose={() => setShowToast(false)}
				message={toastMessage}
			/>
		</div>
	)
}
