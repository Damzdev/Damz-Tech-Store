import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer'
import { ShoppingCart } from './ShoppingCart'
import { useShoppingCart } from '../context/ShoppingCartContext'

export default function Layout() {
	const location = useLocation()
	const hideNavbarPaths: string[] = ['/login', '/signup', '/cart', '/checkout']
	const { isOpen } = useShoppingCart()

	return (
		<div>
			<Header />
			{!hideNavbarPaths.includes(location.pathname) && <Navbar />}
			<main>
				<Outlet />
			</main>
			<Footer />
			<ShoppingCart isOpen={isOpen} />
		</div>
	)
}
