import { Link } from 'react-router-dom'
import cardimg from '../../../assets/Product-cards/shop-secretlab-ergonomic-chairs-mobile.png'

const GamingChairCard = () => {
	return (
		<div className="w-[300px] m-4 ml-14 sm:m-4 rounded-lg overflow-hidden shadow-md border-gray-300 hover:shadow-lg transform transition duration-300 hover:-translate-y-1">
			<img
				className="w-full h-56 object-cover border-b border-gray-300 bg-gradient-radial-circle-gray"
				src={cardimg}
				alt="AMD Product"
			/>
			<div className="h-[240px] flex flex-col flex-1 justify-between p-2">
				<h2 className="text-xl text-center font-bold text-gray-800 mb-8">
					Gaming Chairs
				</h2>
				<p className="text-sm text-gray-600 mb-2">
					Secretlab chairs offer ergonomic design and premium comfort, tailored
					for long hours of gaming or work with adjustable features for optimal
					support.
				</p>
				<Link
					to="/gaming-chairs"
					className="bg-black text-white font-bold py-2 px-4 rounded-md hover:bg-lime-400 hover:text-black transition duration-300 text-center"
				>
					<button className=" ">Buy Now!</button>
				</Link>
			</div>
		</div>
	)
}

export default GamingChairCard
