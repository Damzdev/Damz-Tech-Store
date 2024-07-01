import '../../../styles/productcards.css'
import cardimg from '../../../assets/Product-cards/monitorgaming.png'

export default function MonitorCard() {
	return (
		<div className="card">
			<img src={cardimg} alt="" />
			<div className="card-content">
				<h2 className="card-title">Monitors</h2>
				<p className="card-description">
					ASUS gaming monitors are known for high refresh rates and crisp
					resolutions, enhancing gaming experiences with advanced technologies
					and sleek designs.
				</p>
				<button className="learn-more-btn">Learn More!</button>
			</div>
		</div>
	)
}
