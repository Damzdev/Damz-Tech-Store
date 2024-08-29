import axios from 'axios'
import ProductLayout from '../../../components/ProductLayout'
import img1 from '../../../assets/gaming-pcs/CustomGamingPCs-v2.png'
import img2 from '../../../assets/gaming-pcs/amd-ryzen-7-pcs-banner-400px-v11.png'
import img3 from '../../../assets/gaming-pcs/intel-14th-gen-banner.png'
import img4 from '../../../assets/gaming-pcs/futuristic-machinery-working-inside-electronics-industry-factory-generated-by-ai-free-photo.png'
import { useQuery } from 'react-query'
import ProductsSkeleton from '../../../components/ProductsSkeleton'
import { queryConfig } from '../../../utils/queryConfig'

export type ProductType = {
	ImageURL: string
	id: string
	name: string
	price: number
}

const fetchDellProducts = async (): Promise<ProductType[]> => {
	const response = await axios.get(
		'http://localhost:3005/api/dell-gaming-laptops'
	)
	return response.data
}

const fetchAcerProducts = async (): Promise<ProductType[]> => {
	const response = await axios.get(
		'http://localhost:3005/api/acer-gaming-laptops'
	)
	return response.data
}

const fetchAsusProducts = async (): Promise<ProductType[]> => {
	const response = await axios.get(
		'http://localhost:3005/api/asus-gaming-laptops'
	)
	return response.data
}

const fetchHPProducts = async (): Promise<ProductType[]> => {
	const response = await axios.get(
		'http://localhost:3005/api/hp-gaming-laptops'
	)
	return response.data
}

const fetchLenovoProducts = async (): Promise<ProductType[]> => {
	const response = await axios.get(
		'http://localhost:3005/api/lenovo-gaming-laptops'
	)
	return response.data
}

const fetchMSIProducts = async (): Promise<ProductType[]> => {
	const response = await axios.get(
		'http://localhost:3005/api/msi-gaming-laptops'
	)
	return response.data
}

export default function GamingLaptops() {
	const {
		data: dellProducts,
		isLoading: isLoadingDell,
		isError: isErrorDell,
	} = useQuery<ProductType[]>(
		['gaming-laptops', 'dell'],
		fetchDellProducts,
		queryConfig
	)

	const {
		data: acerProducts,
		isLoading: isLoadingAcer,
		isError: isErrorAcer,
	} = useQuery<ProductType[]>(
		['gaming-laptops', 'acer'],
		fetchAcerProducts,
		queryConfig
	)

	const {
		data: asusProducts,
		isLoading: isLoadingAsus,
		isError: isErrorAsus,
	} = useQuery<ProductType[]>(
		['gaming-laptops', 'asus'],
		fetchAsusProducts,
		queryConfig
	)

	const {
		data: hpProducts,
		isLoading: isLoadingHP,
		isError: isErrorHP,
	} = useQuery<ProductType[]>(
		['gaming-laptops', 'hp'],
		fetchHPProducts,
		queryConfig
	)

	const {
		data: lenovoProducts,
		isLoading: isLoadingLenovo,
		isError: isErrorLenovo,
	} = useQuery<ProductType[]>(
		['gaming-laptops', 'lenovo'],
		fetchLenovoProducts,
		queryConfig
	)

	const {
		data: msiProducts,
		isLoading: isLoadingMSI,
		isError: isErrorMSI,
	} = useQuery<ProductType[]>(
		['gaming-laptops', 'msi'],
		fetchMSIProducts,
		queryConfig
	)

	if (
		isErrorDell ||
		isErrorAcer ||
		isErrorAsus ||
		isErrorHP ||
		isErrorLenovo ||
		isErrorMSI
	) {
		return <div>Error fetching products.</div>
	}

	const products = [
		...(dellProducts || []),
		...(acerProducts || []),
		...(asusProducts || []),
		...(hpProducts || []),
		...(lenovoProducts || []),
		...(msiProducts || []),
	]

	return (
		<div className="bg-white py-8 px-4 md:px-8 lg:px-12">
			<div className="padding-bottom-30">
				<img
					src={img1}
					alt="custom-gamingpc-banner"
					className="block mx-auto w-full max-w-1150 overflow-hidden rounded-lg"
				/>
			</div>
			<h1 className="text-3xl font-bold text-center my-8 text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-400 bg-clip-text ">
				Powerful Gaming Laptops Available Now!
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
			{isLoadingDell ||
			isLoadingAcer ||
			isLoadingAsus ||
			isLoadingHP ||
			isLoadingLenovo ||
			isLoadingMSI ? (
				<ProductsSkeleton />
			) : (
				<ProductLayout products={products} />
			)}
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
