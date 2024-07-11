import { useState } from 'react'
import ProductLayout from '../../../components/ProductLayout'
import { type ProductType } from './GamingComputers'

const gamingLaptops = [
	{ id: 1, name: 'Gaming Laptop 1', price: 1200, imageUrl: 'image1.jpg' },
	{ id: 2, name: 'Gaming Laptop 2', price: 1500, imageUrl: 'image2.jpg' },
	// more products
]

export default function GamingLaptops() {
	const [products, setProducts] = useState<ProductType[]>([])
	return <ProductLayout products={gamingLaptops} />
}
