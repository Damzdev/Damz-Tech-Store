import { Link, NavLink } from 'react-router-dom'
import search from '../assets/header/search.png'
import cart from '../assets/header/shopping-cart.png'
import logo from '../assets/damztech-logo.png'
import burgerMenu from '../assets/header/burger-bar.png'
import { useShoppingCart } from '../context/ShoppingCartContext'
import scrollToTop from '../utils/scrollToTop'

export default function Header() {
	const { cartQuantity, openCart } = useShoppingCart()
	return (
		<>
			<header className="bg-black flex justify-between items-center h-20 px-6 relative z-10">
				<Link to="/">
					<div className="flex items-center">
						<img src={logo} alt="Logo" className="max-w-24" />
						<p className="text-white m-0 font-bold text-xl hidden md:block">
							Damz Tech Store
						</p>
					</div>
				</Link>
				<div className="flex flex-1 max-w-2xl mr-5">
					<button className="bg-[#b0ff6a] rounded-l px-3 flex items-center">
						<img src={search} className="w-6" />
					</button>
					<input
						type="text"
						className="flex-grow h-10 border-none px-3 text-lg outline-none mobile: w-36"
						placeholder="Search..."
					/>
				</div>
				<div className="flex items-center space-x-4">
					<NavLink
						className="text-white px-3 py-2 rounded font-bold hover:text-[#b0ff6a] hidden md:block"
						to="/login"
					>
						Login
					</NavLink>
					<NavLink
						className="text-white px-3 py-2 rounded font-bold hover:text-[#b0ff6a] hidden md:block"
						to="/signup"
					>
						Sign Up
					</NavLink>
					<div className="flex items-center space-x-2">
						<img
							src={burgerMenu}
							alt="Burger Menu"
							className="w-6 h-6 cursor-pointer md:hidden"
						/>
						<div className="hidden md:flex items-center space-x-2 font-bold">
							<button
								className="text-white flex items-center hover:text-[#b0ff6a]"
								onClick={openCart}
							>
								<div className="bg-[#b0ff6a] text-black rounded-full w-7 h-7 flex items-center justify-center text-sm mr-3	">
									{cartQuantity}
								</div>
								<img src={cart} alt="cart-icon" className="w-4 mr-2" />
								Cart
							</button>
						</div>
					</div>
				</div>
			</header>
			<div className="fixed bottom-0 left-0 right-0 bg-black p-3 flex justify-around md:hidden z-20">
				<NavLink
					className="text-white px-3 py-2 rounded no-underline font-bold hover:text-[#b0ff6a]"
					to="/login"
				>
					Login
				</NavLink>
				<NavLink
					className="text-white px-3 py-2 rounded no-underline font-bold hover:text-[#b0ff6a]"
					to="/signup"
				>
					Sign Up
				</NavLink>
				<div onClick={scrollToTop} className="flex items-center space-x-2">
					<a
						href="/cart"
						className="bg-[#b0ff6a] text-black no-underline font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm"
					>
						{cartQuantity}
					</a>
					<NavLink
						className="text-white flex no-underline items-center hover:text-[#b0ff6a]"
						to="/cart"
					>
						<img src={cart} alt="cart-icon" className="w-4 mr-2" />
						Cart
					</NavLink>
				</div>
			</div>
		</>
	)
}
