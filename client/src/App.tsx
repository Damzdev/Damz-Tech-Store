import {
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loginSuccess } from './features/user/userSlice'
import Layout from './components/Layout'
import Cart from './pages/Cart'
import Gamingcomputers from './pages/product-pages/navbar-products/GamingComputers'
import GamingLaptops from './pages/product-pages/navbar-products/GamingLaptops'
import Monitors from './pages/product-pages/navbar-products/Monitors'
import Gamingchairs from './pages/product-pages/navbar-products/GamingChairs'
import Home from './pages/home-page/Home'
import IntelProcessor from './pages/product-pages/navbar-products/IntelProcessors'
import AMDProcessor from './pages/product-pages/navbar-products/AMDProcessors'
import CPUCoolers from './pages/product-pages/navbar-products/CPUCoolers'
import NvidiaGPU from './pages/product-pages/navbar-products/NvidiaGPU'
import RadeonGPU from './pages/product-pages/navbar-products/RadeonGPU'
import Harddrives from './pages/product-pages/navbar-products/Harddrives'
import Keyboards from './pages/product-pages/navbar-products/keyboards'
import RAM from './pages/product-pages/navbar-products/RAM'
import IntelMotherboards from './pages/product-pages/navbar-products/IntelMotherboards'
import AMDMotherboards from './pages/product-pages/navbar-products/AMDMotherboards'
import Mouses from './pages/product-pages/navbar-products/Mouses'
import PowerSupplys from './pages/product-pages/navbar-products/PowerSupplys'
import Cases from './pages/product-pages/navbar-products/Cases'
import SSD from './pages/product-pages/navbar-products/SSD'
import OperatingSystem from './pages/product-pages/navbar-products/OS'
import DellLaptops from './pages/product-pages/navbar-products/DellLaptops'
import MSILaptops from './pages/product-pages/navbar-products/MSILaptops'
import { ShoppingCartProvider } from './context/ShoppingCartContext'
import { QueryClient, QueryClientProvider } from 'react-query'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Orders from './pages/Orders'

const queryClient = new QueryClient()

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="cart" element={<Cart />} />
				<Route path="login" element={<Login />} />
				<Route path="signup" element={<Signup />} />
				<Route path="gaming-computers" element={<Gamingcomputers />} />
				<Route path="gaming-laptops" element={<GamingLaptops />} />
				<Route path="monitors" element={<Monitors />} />
				<Route path="gaming-chairs" element={<Gamingchairs />} />
				<Route
					path="components/intel-processors"
					element={<IntelProcessor />}
				/>
				<Route path="components/AMD-processors" element={<AMDProcessor />} />
				<Route path="components/processor-coolers" element={<CPUCoolers />} />
				<Route path="components/nvidia-cards" element={<NvidiaGPU />} />
				<Route path="components/radeon-cards" element={<RadeonGPU />} />
				<Route path="components/hard-drives" element={<Harddrives />} />
				<Route path="components/keyboards" element={<Keyboards />} />
				<Route path="components/ram-memory" element={<RAM />} />
				<Route
					path="components/intel-motherboards"
					element={<IntelMotherboards />}
				/>
				<Route
					path="components/AMD-motherboards"
					element={<AMDMotherboards />}
				/>
				<Route path="components/gaming-mouses" element={<Mouses />} />
				<Route
					path="components/power-supply-units"
					element={<PowerSupplys />}
				/>
				<Route path="components/SSD" element={<SSD />} />
				<Route
					path="components/operating-system"
					element={<OperatingSystem />}
				/>
				<Route path="components/headsets" element={<Gamingcomputers />} />
				<Route path="components/cases" element={<Cases />} />
				<Route path="FAQS" element={<Gamingcomputers />} />
				<Route path="Terms-and-Conditions" element={<Gamingcomputers />} />
				<Route path="Payment-Options" element={<Gamingcomputers />} />
				<Route path="shipping" element={<Gamingcomputers />} />
				<Route path="Ordering-Info" element={<Gamingcomputers />} />
				<Route path="contact" element={<Gamingcomputers />} />
				<Route path="gaming-computers/AMD" element={<Gamingcomputers />} />
				<Route path="gaming-computers/intel" element={<Gamingcomputers />} />
				<Route path="gaming-laptops/dell" element={<DellLaptops />} />
				<Route path="gaming-laptops/msi" element={<MSILaptops />} />
				<Route path="checkout" element={<Checkout />} />
				<Route path="orders" element={<Orders />} />
			</Route>
		</>
	)
)

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		const accessToken = localStorage.getItem('accessToken')
		const refreshToken = localStorage.getItem('refreshToken')
		if (accessToken && refreshToken) {
			dispatch(loginSuccess({ accessToken, refreshToken }))
		}
	}, [dispatch])

	return (
		<QueryClientProvider client={queryClient}>
			<ShoppingCartProvider>
				<RouterProvider router={router} />
			</ShoppingCartProvider>
		</QueryClientProvider>
	)
}

export default App
