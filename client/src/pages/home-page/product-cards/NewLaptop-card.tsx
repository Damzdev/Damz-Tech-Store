import cardimg from '../../../assets/Product-cards/dell.png'

const NewLaptopCard = () => {
	return (
		<div className="w-[300px] m-4 ml-14 sm:m-4 rounded-lg overflow-hidden shadow-md border-gray-300 hover:shadow-lg transform transition duration-300 hover:-translate-y-1">
			<img
				className="w-full h-56 object-cover border-b border-gray-300 bg-gradient-radial-circle-gray"
				src={cardimg}
				alt="AMD Product"
			/>
			<div className="h-[240px] flex flex-col flex-1 justify-between p-2">
				<h2 className="text-xl text-center font-bold text-gray-800 mb-8">
					New Gaming Laptops
				</h2>
				<p className="card-description text-sm text-gray-600 mb-2">
					Powerful gaming laptops combine portability with high-performance
					hardware, enabling seamless gaming on-the-go with cutting-edge
					graphics and processing capabilities.
				</p>
				<button className="learn-more-btn bg-black text-white font-bold py-2 px-4 rounded-md hover:bg-lime-400 hover:text-black transition duration-300">
					Learn More!
				</button>
			</div>
		</div>
	)
}

export default NewLaptopCard
