import axios from 'axios'
import ProductLayout, { Product } from '../../../components/ProductLayout'
import img1 from '../../../assets/amd-banner/AMD-Product-Banner.png'
import img2 from '../../../assets/gaming-pcs/amd-ryzen-7-pcs-banner-400px-v11.png'
import img3 from '../../../assets/amd-banner/amd-logo.png'
import img4 from '../../../assets/gaming-pcs/futuristic-machinery-working-inside-electronics-industry-factory-generated-by-ai-free-photo.png'
import { useQuery } from 'react-query'
import ProductsSkeleton from '../../../components/ProductsSkeleton'
import { queryConfig } from '../../../utils/queryConfig'

export type ProductType = {
	name: string
	price: number
	memory: string
	cooling: string
	boost: string
	ImageURL: string
	id: string
}

export default function RadeonGPU() {
	const {
		data: products,
		isLoading,
		isError,
	} = useQuery<ProductType[]>(
		['radeon', 'radeon-graphics-card'],
		async () => {
			const response = await axios.get<ProductType[]>(
				'https://damz-tech-store-api.onrender.com/api/components/radeon-gpu/'
			)
			return response.data
		},
		queryConfig
	)

	if (isError) return <div>Error fetching products.</div>

	const productsToDisplay: Product[] = products
		? products.map((product) => ({
				id: product.id,
				name: product.name,
				price: product.price,
				ImageURL: product.ImageURL,
		  }))
		: []

	return (
		<div className="bg-white py-8 px-4 md:px-8 lg:px-12">
			<div className="padding-bottom-30">
				<img
					src={img1}
					alt="custom-gamingpc-banner"
					className="block mx-auto w-full max-w-1150 max-h-96 overflow-hidden rounded-lg"
				/>
			</div>
			<h1 className="text-3xl font-bold text-center my-8 text-transparent bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 bg-clip-text ">
				Powerful Radeon Cards
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
			{isLoading ? (
				<ProductsSkeleton />
			) : (
				<ProductLayout products={productsToDisplay} />
			)}
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
