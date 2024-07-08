import { Link, NavLink } from 'react-router-dom'
import search from '../assets/header/search.png'
import cart from '../assets/shopping-cart.png'

export default function Header() {
	return (
		<header className="bg-black flex justify-between items-center h-20 px-6">
			<Link className="text-white font-bold text-xl" to="/">
				Damz Tech Store
			</Link>
			<div className="flex flex-1 max-w-2xl mr-5">
				<button className="bg-[#b0ff6a] rounded-l px-3 flex items-center">
					<img src={search} className="w-6" />
				</button>
				<input
					type="text"
					className="w-full h-10 border-none rounded-r px-3 text-lg outline-none"
					placeholder="Search..."
				/>
			</div>
			<div className="flex items-center space-x-4">
				<NavLink
					className="text-white px-3 py-2 rounded font-bold hover:text-[#b0ff6a]"
					to="/login"
				>
					Login
				</NavLink>
				<NavLink
					className="text-white px-3 py-2 rounded font-bold hover:text-[#b0ff6a]"
					to="/signup"
				>
					Sign Up
				</NavLink>
				<div className="flex items-center space-x-2">
					<a
						href="/cart"
						className="bg-[#b0ff6a] text-black font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm"
					>
						1
					</a>
					<NavLink
						className="text-white flex items-center hover:text-[#b0ff6a]"
						to="cart"
					>
						<img src={cart} alt="cart-icon" className="w-4 mr-2" />
						Cart
					</NavLink>
				</div>
			</div>
		</header>
	)
}
