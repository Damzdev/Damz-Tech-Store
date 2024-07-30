import React from 'react'

const ProductsSkeleton: React.FC = () => {
	return (
		<div className="grid grid-cols-1 mobile:grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4 md:px-8 lg:px-12 mb-8">
			{Array.from({ length: 5 }).map((_, index) => (
				<div
					key={index}
					className="bg-gray-300 rounded-lg shadow-md overflow-hidden animate-pulse flex flex-col"
				>
					<div className="h-48 bg-gray-400" />
					<div className="p-4 flex flex-col flex-grow">
						<div className="h-6 bg-gray-400 rounded mb-2" />
						<div className="h-8 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 bg-clip-text text-transparent font-bold text-center mb-4" />
						<div className="mt-auto flex justify-between">
							<button
								disabled
								className="bg-gray-200 text-gray-500 text-sm font-bold py-2 px-2 rounded"
							>
								Add to Cart
							</button>
							<button
								disabled
								className="bg-gray-200 text-gray-500 text-sm font-bold py-2 px-4 rounded"
							>
								More Info
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default ProductsSkeleton
