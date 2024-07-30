import { Link } from 'react-router-dom'
import cardimg from '../../assets/intel-banner/Intel-Core-Banner.png'
import cardimg2 from '../../assets/intel-banner/nvidia40series.png'
import scrollToTop from '../../utils/scrollToTop'

export default function Productbannerlinks() {
	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<h1 className="text-sm font-bold text-center sm:text-3xl p-10 text-transparent bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 bg-clip-text">
				Custom Built High-End Gaming Computers, GPU'S, CPU'S & Much More!
			</h1>
			<div className="mb-6 flex justify-center">
				<Link
					to="/components/intel-processors"
					onClick={scrollToTop}
					className="group header-links"
				>
					<img
						className="w-full sm:w-[800px] md:w-[1000px] lg:w-[1300px] h-auto rounded-xl transform transition-transform duration-300 group-hover:scale-105"
						src={cardimg}
						alt="Intel 14th Gen Processor link"
					/>
				</Link>
			</div>
			<div className="mb-4 flex justify-center">
				<Link
					to="/components/nvidia-cards"
					onClick={scrollToTop}
					className="group header-links"
				>
					<img
						className="w-full sm:w-[800px] md:w-[1000px] lg:w-[1300px] h-auto rounded-xl transform transition-transform duration-300 group-hover:scale-105"
						src={cardimg2}
						alt="NVIDIA Graphics Card link"
					/>
				</Link>
			</div>
		</div>
	)
}
