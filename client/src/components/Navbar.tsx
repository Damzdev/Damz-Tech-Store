import { Link } from 'react-router-dom'
import '../styles/navbar.css'
import sidebarbtn from '../assets/sidebar-btn.png'

export default function Navbar() {
	return (
		<nav className="navbar-container">
			<ul className="nav-list">
				<img className="sidebar-btn" src={sidebarbtn} />
				<li>Components</li>
				<Link className="gaming-computers" to="gaming-computers">
					Gaming Pcs
				</Link>
				<Link className="gaming-laptops" to="gaming-laptops">
					Gaming Laptops
				</Link>
				<Link className="monitors" to="monitors">
					Monitors
				</Link>
				<Link className="gaming-chairs" to="gaming-chairs">
					Gaming Chairs
				</Link>
			</ul>
		</nav>
	)
}
