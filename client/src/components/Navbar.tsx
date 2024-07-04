import { Link } from 'react-router-dom'
import '../styles/navbar.css'
import sidebarbtn from '../assets/sidebar-btn.png'

export default function Navbar() {
	return (
		<nav className="navbar-container">
			<ul className="nav-list">
				<img className="sidebar-btn" src={sidebarbtn} alt="Sidebar Button" />
				<button className="components">Components</button>
				<Link className="gaming-computers" to="/gaming-computers">
					Gaming PCs
				</Link>
				<Link className="gaming-laptops" to="/gaming-laptops">
					Gaming Laptops
				</Link>
				<Link className="monitors" to="/monitors">
					Monitors
				</Link>
				<Link className="gaming-chairs" to="/gaming-chairs">
					Gaming Chairs
				</Link>
			</ul>
		</nav>
	)
}
