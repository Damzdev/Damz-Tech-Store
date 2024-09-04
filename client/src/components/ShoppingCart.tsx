import Offcanvas from 'react-bootstrap/Offcanvas'
import { Stack } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { CartItem } from './CartItem'
import cart from '../assets/cart/shopping-cart.png'
import sadFace from '../assets/cart/sad-face.png'
import { Link } from 'react-router-dom'

type ShoppingCartProps = {
	isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
	const { closeCart, cartItems } = useShoppingCart()

	const handleCheckoutClick = () => {
		closeCart()
	}

	return (
		<Offcanvas
			show={isOpen}
			onHide={closeCart}
			placement="end"
			scroll={true}
			className="bg-gray-300"
		>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>
					<div className="flex items-center">
						<img src={cart} className="mr-2" />
						Cart
					</div>
				</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<Stack gap={3}>
					{cartItems.length > 0 ? (
						cartItems.map((item) => <CartItem key={item.id} {...item} />)
					) : (
						<div className="flex flex-col items-center mt-16">
							<img src={sadFace} className="w-32 mb-12" />
							<h1 className="text-xl mb-3 font-bold">Your cart is empty</h1>
							<p className="text-center">
								You haven't added any items to your cart yet. Browse our
								products and add items to your cart to see them here.
							</p>
						</div>
					)}
				</Stack>
				{cartItems.length > 0 && (
					<Link to="/checkout">
						<button
							onClick={handleCheckoutClick}
							className="mt-10 bg-yellow-500 hover:bg-yellow-400 rounded-full p-2 px-6 font-bold"
						>
							Checkout
						</button>
					</Link>
				)}
			</Offcanvas.Body>
		</Offcanvas>
	)
}
