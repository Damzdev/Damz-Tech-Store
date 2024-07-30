import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import search from '../assets/header/search.png'
import cart from '../assets/header/shopping-cart.png'
import logo from '../assets/damztech-logo.png'
import burgerMenu from '../assets/header/burger-bar.png'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { useDispatch, useSelector } from 'react-redux'
import scrollToTop from '../utils/scrollToTop'
import { logout } from '../features/user/userSlice'

export default function Header() {
	const { cartQuantity, openCart } = useShoppingCart()
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
	const accessToken = useSelector((state) => state.auth.accessToken)
	const [name, setName] = useState('')
	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		if (isLoggedIn && accessToken) {
			fetchUserData(accessToken)
		}
	}, [isLoggedIn, accessToken])

	const fetchUserData = async (token: string) => {
		try {
			const response = await fetch('http://localhost:3005/api/users', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			})
			const data = await response.json()
			setName(data.name)
		} catch (error) {
			console.error('Error fetching user data:', error)
		}
	}

	const handleLogout = () => {
		localStorage.removeItem('accessToken')
		localStorage.removeItem('refreshToken')

		dispatch(logout())
		navigate('/login')
	}

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
						className="flex-grow h-10 border-none px-3 text-lg outline-none mobile:w-36"
						placeholder="Search..."
					/>
				</div>
				<div className="flex items-center space-x-4">
					{!isLoggedIn ? (
						<>
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
						</>
					) : (
						<>
							<div className="text-white text-2xl px-3 py-2 rounded font-bold hidden md:block">
								{`Hello, ${name}`}
							</div>
							<button
								onClick={handleLogout}
								className="font-bold text-white flex items-center hover:text-[#b0ff6a]"
							>
								Logout
							</button>
						</>
					)}
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
								<div className="bg-[#b0ff6a] text-black rounded-full w-7 h-7 flex items-center justify-center text-sm mr-3">
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
				{!isLoggedIn ? (
					<>
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
					</>
				) : (
					<div onClick={scrollToTop} className="flex items-center space-x-2">
						<a
							href="/cart"
							className="bg-[#b0ff6a] text-black no-underline font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm"
						>
							{cartQuantity}
						</a>
						<NavLink
							className="text-white flex no-underline items-center hover:text-[#b0ff6a]"
							to="/checkout"
						>
							<img src={cart} alt="cart-icon" className="w-4 mr-2" />
							Cart
						</NavLink>
					</div>
				)}
			</div>
		</>
	)
}
