import { useEffect, useState } from 'react'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { Stack, Button } from 'react-bootstrap'
import { formatPrice } from '../utils/formatCurrency'

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
	const { removeFromCart } = useShoppingCart()
	const [products, setProducts] = useState<Product[]>([])

	useEffect(() => {
		async function fetchProducts() {
			try {
				const response = await fetch('http://localhost:3005/api/all-products')
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`)
				}
				const products = await response.json()
				setProducts(products)
			} catch (error) {
				console.error('Error fetching products:', error)
			}
		}

		fetchProducts()
	}, [])

	const item = products.find((i) => i.id === id)
	if (item == null) return null

	return (
		<Stack direction="horizontal" gap={2}>
			<img
				src={item.ImageURL}
				alt={item.name}
				style={{ width: '125px', height: '75px', objectFit: 'cover' }}
			/>
			<div className="me-auto">
				<div>
					{item.name}{' '}
					{quantity > 1 && <div className="text-muted">x{quantity}</div>}
				</div>
				<div className="text-muted" style={{ fontSize: '.75rem' }}>
					{formatPrice(item.price)}
				</div>
			</div>
			<div>{formatPrice(item.price * quantity)}</div>
			<Button
				variant="outline-danger"
				size="sm"
				onClick={() => removeFromCart(id)}
			>
				&times;
			</Button>
		</Stack>
	)
}
