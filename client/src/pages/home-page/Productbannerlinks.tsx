import { Link } from 'react-router-dom'
import cardimg from '../../assets/intel-banner/Intel-Core-Banner.png'
import cardimg2 from '../../assets/intel-banner/nvidia40series.png'
import '../../styles/homeheaders.css'

export default function Productbannerlinks() {
	return (
		<div className="home-headers-container">
			<h1 className="headers-title">
				Custom Built High-End Gaming Computer, GPU'S, CPU'S & Much More!
			</h1>
			<Link to="/processors/intel" className="header-links">
				<img
					className="product-header"
					src={cardimg}
					alt="Intel 14th Gen Processor link"
				/>
			</Link>
			<Link to="/graphics-cards/nvidia" className="header-links">
				<img
					className="product-header nvidia-header"
					src={cardimg2}
					alt="NVIDIA Graphics Card link"
				/>
			</Link>
		</div>
	)
}
