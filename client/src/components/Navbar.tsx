import { Link } from 'react-router-dom'
import sidebarbtn from '../assets/sidebar-btn.png'
import Components from './Components'

export default function Navbar() {
	return (
		<nav className="w-auto bg-lightgray text-black h-9 items-center hidden sm:flex">
			<img
				className="w-5 h-auto cursor-pointer ml-12"
				src={sidebarbtn}
				alt="Sidebar Button"
			/>
			<ul className="flex list-none cursor-pointer pl-2">
				<Components />
				<Link
					className="mr-5 text-black no-underline self-center"
					to="/gaming-computers"
				>
					Gaming PCs
				</Link>
				<Link
					className="mr-5 text-black no-underline self-center"
					to="/gaming-laptops"
				>
					Gaming Laptops
				</Link>
				<Link
					className="mr-5 text-black no-underline self-center"
					to="/monitors"
				>
					Monitors
				</Link>
				<Link
					className="mr-5 text-black no-underline self-center"
					to="/gaming-chairs"
				>
					Gaming Chairs
				</Link>
			</ul>
		</nav>
	)
}
