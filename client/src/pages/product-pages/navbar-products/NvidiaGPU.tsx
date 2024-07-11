import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductLayout from '../../../components/ProductLayout'
import img1 from '../../../assets/product-banners/nvidia40series.png'
import img2 from '../../../assets/gaming-pcs/amd-ryzen-7-pcs-banner-400px-v11.png'
import img3 from '../../../assets/amd-banner/amd-logo.png'
import img4 from '../../../assets/gaming-pcs/futuristic-machinery-working-inside-electronics-industry-factory-generated-by-ai-free-photo.png'

export type ProductType = {
	TDP: string
	cache: string
	cores: string
	price: number
	'power-compatibility': string
	name: string
	ImageURL: string
	id: string
}

export default function NvidiaGPU() {
	const [products, setProducts] = useState<ProductType[]>([])

	useEffect(() => {
		async function fetchProducts() {
			try {
				const responseIntel = await axios.get<ProductType[]>(
					'http://localhost:3005/api/components/nvidia-gpu/'
				)
				setProducts(responseIntel.data)
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
					alt="custom-gamingpc-banner"
					className="block mx-auto w-full max-w-1150 max-h-96 overflow-hidden rounded-lg"
				/>
			</div>
			<h1 className="text-3xl font-bold text-center my-8 text-transparent bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text">
				Powerful Nvidia Cards
			</h1>
			<div className="flex flex-wrap justify-center mb-8">
				<img
					src={img2}
					alt="AMD Banner"
					className="w-48 h-auto rounded-lg m-2 transition-transform duration-150 hover:scale-105"
				/>
				<img
					src={img4}
					alt="NVIDIA Banner"
					className="w-48 h-auto rounded-lg m-2 transition-transform duration-150 hover:scale-105"
				/>
				<img
					src={img3}
					alt="Intel Banner"
					className="w-48 h-auto rounded-lg m-2 transition-transform duration-150 hover:scale-105"
				/>
			</div>
			<ProductLayout products={products} />
			<div className="padding-bottom-30">
				<img
					src={img1}
					alt="intel-banner"
					className="block mx-auto w-full max-w-1150 max-h-96 overflow-hidden rounded-lg"
				/>
			</div>
		</div>
	)
}
