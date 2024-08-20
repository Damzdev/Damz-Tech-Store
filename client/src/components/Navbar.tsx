import { Link } from 'react-router-dom'
import Components from './Components'
import nvidia from '../assets/navbar/nvidia-logo-png-transparent.png'
import amd from '../assets/navbar/amd-ryzen-logo.png'
import intel from '../assets/navbar/intel-logo.png'

export default function Navbar() {
	return (
		<nav className="bg-gray-300 text-black h-[33px] items-center lg:flex hidden lg:w-auto">
			<ul className="flex list-none cursor-pointer pl-6">
				<Link
					className="mr-5 text-black no-underline self-center"
					to="/components/nvidia-cards"
				>
					<img
						src={nvidia}
						alt="nvidia-logo"
						className="w-12 h-6 self-center mr-3"
					/>
				</Link>
				<Link
					className="mr-5 text-black no-underline self-center"
					to="/components/radeon-cards"
				>
					<img
						src={amd}
						alt="nvidia-logo"
						className="w-12 h-6 self-center mr-3"
					/>
				</Link>
				<Link
					className="mr-5 text-black no-underline self-center"
					to="/components/intel-processors"
				>
					<img
						src={intel}
						alt="nvidia-logo"
						className="w-12 self-center mr-3"
					/>
				</Link>
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
