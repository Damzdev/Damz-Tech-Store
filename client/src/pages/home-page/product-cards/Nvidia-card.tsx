import '../../../styles/productcards.css'
import cardimg from '../../../assets/Product-cards/nvidia-rtx-graphics-card.png'

export default function NvidiaCard() {
	return (
		<div className="card">
			<img src={cardimg} alt="" />
			<div className="card-content">
				<h2 className="card-title">Nvidia 40 Series</h2>
				<p className="card-description">
					NVIDIA RTX 40 series graphics cards deliver groundbreaking performance
					and real-time ray tracing, setting new standards in gaming and
					rendering with unparalleled visual fidelity and speed.
				</p>
				<button className="learn-more-btn">Learn More!</button>
			</div>
		</div>
	)
}
