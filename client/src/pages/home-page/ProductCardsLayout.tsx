export default function ProductCardsLayout() {
	return (
		<div className="w-[300px] m-4 ml-14 sm:m-4 rounded-lg overflow-hidden shadow-md border-gray-300 hover:shadow-lg transform transition duration-300 hover:-translate-y-1">
			<img
				className="w-full h-56 object-cover border-b border-gray-300 bg-gradient-radial-circle-gray"
				src=""
				alt="AMD Product"
			/>
			<div className="h-[240px] flex flex-col flex-1 justify-between p-2">
				<h2 className="text-xl text-center  font-bold text-gray-800 mb-7">
					Rx 7900 XTX
				</h2>
				<p className="card-description text-sm text-gray-600 mb-2">
					The Radeon RX 7900 XTX is a high-performance graphics card known for
					its cutting-edge GPU architecture, delivering exceptional gaming and
					rendering capabilities with advanced features for enthusiasts.
				</p>
				<button className="learn-more-btn bg-black text-white font-bold py-2 px-4 rounded-md hover:bg-lime-400 hover:text-black transition duration-300">
					Learn More!
				</button>
			</div>
		</div>
	)
}
