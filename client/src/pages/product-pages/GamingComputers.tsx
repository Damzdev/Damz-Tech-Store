import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductLayout from '../../components/ProductLayout'
import img1 from '../../assets/gaming-pcs/CustomGamingPCs-v2.png'

type ProductType = {
	CPU: string
	Case: string
	GPU: string
	ImageURL: string
	PowerSupply: string
	RAM: string
	SSD: string
	id: string
	motherboard: string
	name: string
	price: number
}

export default function GamingComputers() {
	const [products, setProducts] = useState<ProductType[]>([])

	useEffect(() => {
		async function fetchProducts() {
			try {
				const responseIntel = await axios.get<ProductType[]>(
					'http://localhost:3005/api/gaming-pcs/intel'
				)
				const responseAMD = await axios.get<ProductType[]>(
					'http://localhost:3005/api/gaming-pcs/amd'
				)
				const combinedProducts = [...responseIntel.data, ...responseAMD.data]
				setProducts(combinedProducts)
			} catch (error) {
				console.error('Error fetching products:', error)
			}
		}

		fetchProducts()
	}, [])

	return (
		<>
			<h1 className="gaming-pc-title">Powerful Gaming PCs</h1>
			<img src={img1} alt="intel-banner" className="gaming-pc-banner-img" />
			<ProductLayout products={products} />
		</>
	)
}
