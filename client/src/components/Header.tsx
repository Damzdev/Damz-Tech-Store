import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Offcanvas } from 'react-bootstrap'
import search from '../assets/header/search.png'
import cart from '../assets/header/shopping-cart.png'
import logo from '../assets/damztech-logo.png'
import burgerMenu from '../assets/header/burger-bar.png'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { useDispatch, useSelector } from 'react-redux'
import scrollToTop from '../utils/scrollToTop'
import { logout } from '../features/user/userSlice'

export interface RootState {
	auth: {
		isLoggedIn: boolean
		accessToken: string | null
	}
}

export default function Header() {
	const { cartQuantity, openCart } = useShoppingCart()
	const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
	const accessToken = useSelector((state: RootState) => state.auth.accessToken)
	const [name, setName] = useState('')
	const [showOffcanvas, setShowOffcanvas] = useState(false)
	const [showComponents, setShowComponents] = useState(false)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		if (isLoggedIn && accessToken) {
			fetchUserData(accessToken)
		}
	}, [isLoggedIn, accessToken])

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				showComponents &&
				!(event.target as HTMLElement).closest('.relative')
			) {
				setShowComponents(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [showComponents])

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

	const toggleOffcanvas = () => setShowOffcanvas(!showOffcanvas)
	const toggleDropDown = () => setShowComponents(!showComponents)

	return (
		<>
			<header className="bg-black flex justify-between items-center h-20 px-6 z-10 sticky top-0 md:static">
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
						<img src={search} className="w-6" alt="Search" />
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
								className="font-bold text-white flex items-center max-500:hidden hover:text-[#b0ff6a]"
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
							onClick={toggleOffcanvas}
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
			<Offcanvas show={showOffcanvas} onHide={toggleOffcanvas} placement="end">
				<Offcanvas.Header closeButton className="bg-black text-white">
					<Offcanvas.Title className="text-4xl">Menu</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body className="bg-black text-white">
					<Offcanvas.Title className="font-bold text-3xl mb-6">
						{`Welcome ${!isLoggedIn ? 'User' : name}`}
					</Offcanvas.Title>
					<div className="flex flex-col">
						<NavLink
							to="/"
							className="border-t border-b border-white mb-2 py-3 transition-transform transform hover:translate-y-[-4px]"
							onClick={toggleOffcanvas}
						>
							Home
						</NavLink>

						<div className="relative">
							<button
								onClick={toggleDropDown}
								className="border-b border-white mb-2 py-3 flex items-center w-full text-left transition-transform transform hover:translate-y-[-4px]"
							>
								Components
								<svg
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className={`ml-2 transform ${
										showComponents ? 'rotate-180' : ''
									}`}
								>
									<path d="M5 8L19 8L12 19L5 8Z" fill="white" />
								</svg>
							</button>
							<div
								className={`bg-gray-800 overflow-y-auto transition-all duration-300 ${
									showComponents ? 'max-h-[60vh]' : 'max-h-0'
								}`}
							>
								<NavLink
									to="/components/intel-processors"
									className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
									onClick={toggleOffcanvas}
								>
									CPU Processors (Intel)
								</NavLink>
								<NavLink
									to="/components/AMD-processors"
									className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
									onClick={toggleOffcanvas}
								>
									CPU Processors (AMD)
								</NavLink>
								<NavLink
									to="/components/processor-coolers"
									className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
									onClick={toggleOffcanvas}
								>
									CPU Coolers
								</NavLink>
								<NavLink
									to="/components/nvidia-cards"
									className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
									onClick={toggleOffcanvas}
								>
									Graphics Cards (Nvidia)
								</NavLink>
								<NavLink
									to="/components/radeon-cards"
									className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
									onClick={toggleOffcanvas}
								>
									Graphics Cards (Radeon)
								</NavLink>
								<NavLink
									to="/components/hard-drives"
									className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
									onClick={toggleOffcanvas}
								>
									Hard Drives
								</NavLink>
								<NavLink
									to="/components/keyboards"
									className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
									onClick={toggleOffcanvas}
								>
									Keyboards
								</NavLink>
								<NavLink
									to="/components/ram-memory"
									className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
									onClick={toggleOffcanvas}
								>
									Memory (RAM)
								</NavLink>
								<NavLink
									to="/components/intel-motherboards"
									className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
									onClick={toggleOffcanvas}
								>
									Motherboards (Intel)
								</NavLink>
								<NavLink
									to="/components/AMD-motherboards"
									className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
									onClick={toggleOffcanvas}
								>
									Motherboards (AMD)
								</NavLink>
								<NavLink
									to="/components/processor-coolers"
									className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
									onClick={toggleOffcanvas}
								>
									CPU Coolers
								</NavLink>
								<NavLink
									to="/components/gaming-mouses"
									className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
									onClick={toggleOffcanvas}
								>
									Mouses
								</NavLink>
								<NavLink
									to="/components/power-supply-units"
									className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
									onClick={toggleOffcanvas}
								>
									Power Supply
								</NavLink>
								<NavLink
									to="/components/cases"
									className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
									onClick={toggleOffcanvas}
								>
									PC Case
								</NavLink>
								<NavLink
									to="/components/SSD"
									className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
									onClick={toggleOffcanvas}
								>
									SSD
								</NavLink>
								<NavLink
									to="/components/operating-system"
									className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
									onClick={toggleOffcanvas}
								>
									Operating System
								</NavLink>
							</div>
						</div>
						<NavLink
							to="/gaming-computers"
							className="border-b border-white mb-2 py-3 transition-transform transform hover:translate-y-[-4px]"
							onClick={toggleOffcanvas}
						>
							Gaming Pcs
						</NavLink>
						<NavLink
							to="/gaming-laptops"
							className="border-b border-white mb-2 py-3 transition-transform transform hover:translate-y-[-4px]"
							onClick={toggleOffcanvas}
						>
							Gaming Laptops
						</NavLink>
						<NavLink
							to="/monitors"
							className="border-b border-white mb-2 py-3 transition-transform transform hover:translate-y-[-4px]"
							onClick={toggleOffcanvas}
						>
							Monitors
						</NavLink>
						<NavLink
							to="/gaming-chairs"
							className="border-b border-white mb-2 py-3 transition-transform transform hover:translate-y-[-4px]"
							onClick={toggleOffcanvas}
						>
							Gaming Chairs
						</NavLink>
					</div>
					{isLoggedIn && (
						<div className="absolute bottom-0 left-0 w-full p-3 bg-black">
							<button
								className="text-2xl text-white flex items-center justify-center font-bold w-full py-2 transition-transform transform hover:translate-y-[-4px]"
								onClick={() => {
									handleLogout()
									toggleOffcanvas()
								}}
							>
								Logout
								<svg
									className="ml-2"
									width="26"
									height="26"
									viewBox="0 0 35 34"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M13.125 29.75H7.29167C6.51812 29.75 5.77625 29.4515 5.22927 28.9201C4.68229 28.3888 4.375 27.6681 4.375 26.9167V7.08333C4.375 6.33189 4.68229 5.61122 5.22927 5.07986C5.77625 4.54851 6.51812 4.25 7.29167 4.25H13.125M23.3333 24.0833L30.625 17M30.625 17L23.3333 9.91667M30.625 17H13.125"
										stroke="#FF3B30"
										stroke-width="4"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</button>
						</div>
					)}
				</Offcanvas.Body>
			</Offcanvas>
			<div className="fixed bottom-0 left-0 w-full bg-black flex justify-between px-6 py-3 md:hidden z-50">
				<button className="flex items-center" onClick={openCart}>
					<img src={cart} alt="cart-icon" className="w-6 cursor-pointer" />
					<div className="bg-[#b0ff6a] text-black rounded-full w-6 h-6 flex items-center font-bold justify-center text-sm ml-2">
						{cartQuantity}
					</div>
				</button>
				{!isLoggedIn ? (
					<div className="flex items-center space-x-4">
						<NavLink
							className="text-white px-3 py-2 rounded font-bold hover:text-[#b0ff6a]"
							to="/login"
							onClick={scrollToTop}
						>
							Login
						</NavLink>
						<NavLink
							className="text-white px-3 py-2 rounded font-bold hover:text-[#b0ff6a]"
							to="/signup"
							onClick={scrollToTop}
						>
							Sign Up
						</NavLink>
					</div>
				) : (
					<div className="text-white text-lg px-3 py-2 rounded font-bold">
						{`Welcome, ${name}`}
					</div>
				)}
			</div>
		</>
	)
}
