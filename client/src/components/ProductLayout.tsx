import React, { useState } from 'react'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { formatPrice } from '../utils/formatCurrency'
import AddedItem from './ItemAddedNotification'

export type Product = {
	id: string
	name: string
	price: number
	ImageURL: string
}

type ProductLayoutProps = {
	products: Product[]
	isLoading?: boolean
}

const ProductLayout: React.FC<ProductLayoutProps> = ({ products }) => {
	const { increaseCartQuantity } = useShoppingCart()

	const [showToast, setShowToast] = useState(false)
	const [toastMessage, setToastMessage] = useState('')

	const sortProductsByPrice = () => {
		return products.sort((a, b) => a.price - b.price)
	}

	const sortedProducts = products ? sortProductsByPrice() : []

	const handleAddToCart = (product: Product) => {
		increaseCartQuantity(product.id)
		setToastMessage('item added to cart!')
		setShowToast(true)
	}

	return (
		<div>
			<div className="grid grid-cols-1 max-500:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4 md:px-8 lg:px-12 mb-8">
				{sortedProducts.map((product) => (
					<div
						key={product.id}
						className="bg-gray-300 rounded-lg shadow-md overflow-hidden transform hover:-translate-y-3 transition duration-300 flex flex-col"
					>
						<img
							src={product.ImageURL}
							alt={product.name}
							className="w-auto h-48"
						/>
						<div className="p-4 flex flex-col flex-grow">
							<h2 className="text-xs h-24 font-bold mb-2">{product.name}</h2>
							<p className="text-transparent text-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-400 bg-clip-text font-bold mb-4 text-center">
								{formatPrice(product.price)}
							</p>
							<div className="mt-auto flex justify-between">
								<button
									onClick={() => handleAddToCart(product)}
									className="bg-white text-sm hover:bg-lime-400 text-gray-800 font-bold mr-2 py-2 px-2 rounded"
								>
									Add to Cart
								</button>
								<button className="bg-white text-sm hover:bg-lime-400 text-gray-800 font-bold py-2 px-4 rounded">
									More Info
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			<AddedItem
				show={showToast}
				onClose={() => setShowToast(false)}
				message={toastMessage}
			/>
		</div>
	)
}

export default ProductLayout
