import { useShoppingCart } from '../context/ShoppingCartContext'
import { Stack, Button } from 'react-bootstrap'
import { formatPrice } from '../utils/formatCurrency'
import { useQuery } from 'react-query'
import axios from 'axios'
import { queryConfig } from '../utils/queryConfig'

type CartItemProps = {
	id: string
	quantity: number
}

type Product = {
	id: string
	name: string
	price: number
	ImageURL: string
}

const API_URL = 'https://damz-tech-store-api.onrender.com/api'

export function CartItem({ id, quantity }: CartItemProps) {
	const { removeFromCart } = useShoppingCart()
	const {
		data: product,
		isLoading,
		isError,
	} = useQuery<Product>(
		['product', id],
		async () => {
			const response = await axios.post<Product[]>(`${API_URL}/cartItems`, {
				cartItems: [id],
			})
			return response.data[0]
		},
		{
			...queryConfig,
			staleTime: Infinity,
		}
	)

	if (isLoading) return <div>Loading...</div>
	if (isError) return <div>Error fetching product.</div>
	if (!product) return null

	return (
		<Stack direction="horizontal" gap={2} className="d-flex align-items-center">
			<img
				src={product.ImageURL}
				alt={product.name}
				style={{ width: '125px', height: '75px', objectFit: 'cover' }}
			/>
			<div className="me-auto">
				<div className="text-xs">
					{product.name}{' '}
					{quantity > 1 && (
						<span className="text-muted" style={{ fontSize: '0.65rem' }}>
							x{quantity}
						</span>
					)}
				</div>
				<div className="text-muted" style={{ fontSize: '0.75rem' }}>
					{formatPrice(product.price)}
				</div>
			</div>
			<div className="font-bold">{formatPrice(product.price * quantity)}</div>
			<Button
				variant="outline-danger"
				size="sm"
				onClick={() => removeFromCart(product.id)}
			>
				&times;
			</Button>
		</Stack>
	)
}

export function CartSummary() {
	const { cartItems } = useShoppingCart()
	const {
		data: products,
		isLoading,
		isError,
	} = useQuery<Product[]>(
		['products', cartItems],
		async () => {
			const response = await axios.post<Product[]>(`${API_URL}/cartItems`, {
				cartItems: cartItems.map((item) => item.id),
			})
			return response.data
		},
		queryConfig
	)

	if (isLoading) return <div>Loading...</div>
	if (isError) return <div>Error fetching products.</div>

	const totalPrice = cartItems.reduce((total, cartItem) => {
		const product = products?.find((p) => p.id === cartItem.id)
		return total + (product ? product.price * cartItem.quantity : 0)
	}, 0)

	return (
		<div className="mt-4 text-right font-bold">
			Total: {formatPrice(totalPrice)}
		</div>
	)
}
