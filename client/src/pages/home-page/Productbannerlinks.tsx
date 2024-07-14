import { Link } from 'react-router-dom'
import cardimg from '../../assets/intel-banner/Intel-Core-Banner.png'
import cardimg2 from '../../assets/intel-banner/nvidia40series.png'
import scrollToTop from '../../utils/scrollToTop'

export default function Productbannerlinks() {
	return (
		<div className="home-headers-container">
			<h1 className="headers-title">
				Custom Built High-End Gaming Computers, GPU'S, CPU'S & Much More!
			</h1>
			<div className="intel-container">
				<Link
					to="/components/intel-processors"
					onClick={scrollToTop}
					className="header-links"
				>
					<img
						className="product-header"
						src={cardimg}
						alt="Intel 14th Gen Processor link"
					/>
				</Link>
			</div>
			<div className="nvidia-container">
				<Link
					to="/components/nvidia-cards"
					onClick={scrollToTop}
					className="header-links"
				>
					<img
						className="product-header nvidia-header"
						src={cardimg2}
						alt="NVIDIA Graphics Card link"
					/>
				</Link>
			</div>
		</div>
	)
}
