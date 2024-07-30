import { useState } from 'react'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { Stack, Button } from 'react-bootstrap'
import { formatPrice } from '../utils/formatCurrency'
import axios from 'axios'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import sadFace from '../assets/cart/sad-face.png'
import { logout } from '../features/user/userSlice'
import { useDispatch } from 'react-redux'
import AddedItem from '../components/ItemAddedNotification'

type Product = {
	id: string
	name: string
	price: number
	ImageURL: string
}

export default function Checkout() {
	const { cartItems, removeFromCart, clearCart } = useShoppingCart()
	const [name, setName] = useState('')
	const [address, setAddress] = useState('')
	const [showToast, setShowToast] = useState(false)
	const [toastMessage, setToastMessage] = useState('')
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const {
		data: products,
		isLoading,
		isError,
	} = useQuery<Product[]>('all-products', async () => {
		const response = await axios.get<Product[]>(
			'http://localhost:3005/api/all-products'
		)
		return response.data
	})

	if (isLoading) return <div>Loading...</div>
	if (isError) return <div>Error fetching products.</div>

	const productsToDisplay: Product[] = products || []

	const totalPrice = cartItems.reduce((total, cartItem) => {
		const product = productsToDisplay.find((p) => p.id === cartItem.id)
		return total + (product ? product.price * cartItem.quantity : 0)
	}, 0)

	const handlePlaceOrder = async () => {
		try {
			const accessToken = localStorage.getItem('accessToken') // Retrieve the access token from localStorage
			if (!accessToken) {
				setToastMessage('Login required session expired!')
				setShowToast(true)
				return
			}

			const productIds = cartItems.map((item) => item.id)

			const response = await axios.post(
				'http://localhost:3005/api/orders',
				{ name, address, productIds, totalPrice },
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			)

			if (response.status === 201) {
				clearCart()
				navigate('/orders', {
					state: { showToast: true, message: 'Order Placed Successfully!' },
				})
			}
		} catch (error) {
			console.error('Error placing order: ', error)
			dispatch(logout())
			setTimeout(() => {
				navigate('/login')
			}, 3000)
		}
	}

	return (
		<div className="p-20">
			<AddedItem
				show={showToast}
				onClose={() => setShowToast(false)}
				message={toastMessage}
			/>
			{cartItems.length > 0 ? (
				<div className="flex flex-col md:flex-row w-[380px] sm:w-auto">
					<div className="max-w-1000 bg-gray-300 p-4 rounded-md mb-4 md:mr-4">
						<h1 className="font-bold text-4xl">Checkout</h1>
						<div className="flex flex-row text-white bg-black mt-4 rounded-md p-2">
							<h3 className="ml-6 font-bold flex-1">Product Details</h3>
							<h3 className="font-bold w-20 text-center">Quantity</h3>
							<h3 className="font-bold w-32 text-center">Price</h3>
						</div>
						{productsToDisplay.map((product) => {
							const cartItem = cartItems.find((item) => item.id === product.id)
							if (!cartItem) return null

							return (
								<Stack
									key={product.id}
									direction="horizontal"
									gap={2}
									className="items-center mt-4"
								>
									<img
										src={product.ImageURL}
										alt={product.name}
										style={{
											width: '125px',
											height: '75px',
											objectFit: 'cover',
										}}
										className="rounded-lg"
									/>
									<div className="me-auto">
										<div className="text-xs">
											{product.name}{' '}
											{cartItem.quantity > 1 && (
												<span className="text-muted">x{cartItem.quantity}</span>
											)}
										</div>
									</div>
									<div className="font-bold w-20 text-center">
										{cartItem.quantity}
									</div>
									<div className="font-bold w-32 text-center">
										{formatPrice(product.price * cartItem.quantity)}
									</div>
									<Button
										variant="outline-danger"
										size="sm"
										onClick={() => removeFromCart(product.id)}
									>
										&times;
									</Button>
								</Stack>
							)
						})}
						<div className="mt-4 text-right">
							<h3 className="font-bold text-lg">
								Total: {formatPrice(totalPrice)}
							</h3>
						</div>
					</div>
					<div className="max-w-1000 bg-gray-300 p-4 rounded-md md:max-h-[320px]">
						<h1 className="font-bold text-4xl flex-1">Shipping & Address</h1>
						<div className="flex flex-col mt-8">
							<p className="font-bold">First Name</p>
							<input
								type="text"
								className="bg-transparent border-2 border-black rounded-md p-1 mb-6 pl-4"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							<p className="font-bold">Address</p>
							<input
								type="text"
								className="bg-transparent border-2 border-black pl-4 rounded-md p-1 mb-6"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>
							<button
								className="bg-lime-300 font-bold hover:bg-lime-400 rounded-md p-2 bottom-2"
								onClick={handlePlaceOrder}
							>
								Place your order!
							</button>
						</div>
					</div>
				</div>
			) : (
				<div className="flex flex-col items-center mt-16">
					<img src={sadFace} className="w-32 mb-12" />
					<h1 className="text-xl mb-3 font-bold">Your cart is empty</h1>
					<p className="text-center mb-10">
						You haven't added any items to your cart yet. Browse our products
						and add items to your cart to see them here.
					</p>
					<button className="bg-lime-300 text-black font-bold rounded-md p-2 w-96 hover:bg-lime-400">
						<a href="/">Home</a>
					</button>
				</div>
			)}
		</div>
	)
}
