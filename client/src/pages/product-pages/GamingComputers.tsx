import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductLayout from '../../components/ProductLayout'
import img1 from '../../assets/gaming-pcs/CustomGamingPCs-v2.png'
import img2 from '../../assets/gaming-pcs/amd-ryzen-7-pcs-banner-400px-v11.png'
import img3 from '../../assets/gaming-pcs/intel-14th-gen-banner.png'
import img4 from '../../assets/gaming-pcs/futuristic-machinery-working-inside-electronics-industry-factory-generated-by-ai-free-photo.png'

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
		<div className="bg-white py-8 px-4 md:px-8 lg:px-12">
			<div className="padding-bottom-30">
				<img
					src={img1}
					alt="intel-banner"
					className="block mx-auto w-full max-w-1150 overflow-hidden rounded-lg"
				/>
			</div>
			<h1 className="text-3xl font-bold text-center my-8 text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-400 bg-clip-text ">
				Powerful Gaming PCs
			</h1>
			<div className="flex flex-wrap justify-center mb-8">
				<img
					src={img2}
					alt="AMD Banner"
					className="w-48 h-auto rounded-lg m-2 transition-transform duration-150 hover:scale-105"
				/>
				<img
					src={img3}
					alt="Intel Banner"
					className="w-48 h-auto rounded-lg m-2 transition-transform duration-150 hover:scale-105"
				/>
				<img
					src={img4}
					alt="NVIDIA Banner"
					className="w-48 h-auto rounded-lg m-2 transition-transform duration-150 hover:scale-105"
				/>
			</div>
			<ProductLayout products={products} />
			<div className="padding-bottom-30">
				<img
					src={img1}
					alt="intel-banner"
					className="block mx-auto w-full max-w-1150 overflow-hidden rounded-lg"
				/>
			</div>
		</div>
	)
}
