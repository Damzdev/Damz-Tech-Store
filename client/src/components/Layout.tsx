import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
	const location = useLocation()
	const hideNavbarPaths: string[] = ['/login', '/signup', '/cart', '/checkout']

	return (
		<div>
			<Header />
			{!hideNavbarPaths.includes(location.pathname) && <Navbar />}
			<main>
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}
