import '../../../styles/productcards.css'
import cardimg from '../../../assets/Product-cards/dell.png'

export default function NewLaptopCard() {
	return (
		<div className="card">
			<img src={cardimg} alt="" />
			<div className="card-content">
				<h2 className="card-title">New Gaming Laptops</h2>
				<p className="card-description">
					Powerful gaming laptops combine portability with high-performance
					hardware, enabling seamless gaming on-the-go with cutting-edge
					graphics and processing capabilities.
				</p>
				<button className="learn-more-btn">Learn More!</button>
			</div>
		</div>
	)
}
