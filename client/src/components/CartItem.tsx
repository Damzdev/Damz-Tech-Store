import { useShoppingCart } from '../context/ShoppingCartContext'
import { Stack, Button } from 'react-bootstrap'
import { formatPrice } from '../utils/formatCurrency'
import { useQuery } from 'react-query'
import axios from 'axios'

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

export function CartItem({ id, quantity }: CartItemProps) {
	const { removeFromCart, cartItems } = useShoppingCart()
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

	const item = products?.find((i) => i.id === id)
	if (item == null) return null

	// Calculate the total price
	const totalPrice = cartItems.reduce((total, cartItem) => {
		const product = products?.find((p) => p.id === cartItem.id)
		return total + (product ? product.price * cartItem.quantity : 0)
	}, 0)

	return (
		<>
			<Stack direction="horizontal" gap={2}>
				<img
					src={item.ImageURL}
					alt={item.name}
					style={{ width: '125px', height: '75px', objectFit: 'cover' }}
				/>
				<div className="me-auto">
					<div className="text-xs">
						{item.name}{' '}
						{quantity > 1 && <div className="text-muted">x{quantity}</div>}
					</div>
				</div>
				<div className="font-bold">{formatPrice(item.price * quantity)}</div>
				<Button
					variant="outline-danger"
					size="sm"
					onClick={() => removeFromCart(item.id)}
				>
					&times;
				</Button>
			</Stack>
			{/* Render total price at the bottom */}
			{cartItems[cartItems.length - 1].id === id && (
				<div className="mt-4 text-right font-bold">
					Total: {formatPrice(totalPrice)}
				</div>
			)}
		</>
	)
}
