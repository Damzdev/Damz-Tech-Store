import '../../../styles/productcards.css'
import cardimg from '../../../assets/Product-cards/Radeon RX 7900 XTX Phantom Gaming 24GB OC.png'

export default function AmdCard() {
	return (
		<div className="card">
			<img src={cardimg} alt="" />
			<div className="card-content">
				<h2 className="card-title">Rx 7900 XTX</h2>
				<p className="card-description">
					The Radeon RX 7900 XTX is a high-performance graphics card known for
					its cutting-edge GPU architecture, delivering exceptional gaming and
					rendering capabilities with advanced features for enthusiasts.
				</p>
				<button className="learn-more-btn">Learn More!</button>
			</div>
		</div>
	)
}
