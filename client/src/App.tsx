import {
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Cart from './pages/Cart'
import Gamingcomputers from './pages/GamingComputers'
import Gaminglaptops from './pages/GamingLaptops'
import Monitors from './pages/Monitors'
import Gamingchairs from './pages/GamingChairs'
import Home from './pages/home-page/Home'

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="login" element={<Login />} />
				<Route path="signup" element={<Signup />} />
				<Route path="cart" element={<Cart />} />
				<Route path="gaming-computers" element={<Gamingcomputers />} />
				<Route path="gaming-laptops" element={<Gaminglaptops />} />
				<Route path="monitors" element={<Monitors />} />
				<Route path="gaming-chairs" element={<Gamingchairs />} />
			</Route>
		</>
	)
)

function App() {
	return <RouterProvider router={router} />
}

export default App
