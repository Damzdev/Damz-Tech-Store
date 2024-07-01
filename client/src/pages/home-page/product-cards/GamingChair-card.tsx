import '../../../styles/productcards.css'
import cardimg from '../../../assets/Product-cards/shop-secretlab-ergonomic-chairs-mobile.png'

export default function GamingChairCard() {
	return (
		<div className="card">
			<img src={cardimg} alt="" />
			<div className="card-content">
				<h2 className="card-title">Gaming Chairs</h2>
				<p className="card-description">
					Secretlab chairs offer ergonomic design and premium comfort, tailored
					for long hours of gaming or work with adjustable features for optimal
					support.
				</p>
				<button className="learn-more-btn">Learn More!</button>
			</div>
		</div>
	)
}
