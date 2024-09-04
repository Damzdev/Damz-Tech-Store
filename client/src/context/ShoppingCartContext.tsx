import {
	createContext,
	ReactNode,
	useContext,
	useState,
	useEffect,
} from 'react'
import { cartApi } from '../utils/api'
import { useSelector } from 'react-redux'
import { RootState } from '../components/Header'

type ShoppingCartProviderProps = {
	children: ReactNode
}

type CartItem = {
	id: string
	quantity: number
}

type ShoppingCartContext = {
	openCart: () => void
	closeCart: () => void
	getItemQuantity: (id: string) => number
	increaseCartQuantity: (id: string) => Promise<void>
	decreaseCartQuantity: (id: string) => Promise<void>
	removeFromCart: (id: string) => Promise<void>
	clearCart: () => Promise<void>
	cartQuantity: number
	cartItems: CartItem[]
	isOpen: boolean
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
	return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [cartItems, setCartItems] = useState<CartItem[]>([])
	const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

	useEffect(() => {
		const syncCart = async () => {
			if (isLoggedIn) {
				const serverCart = await cartApi.getCart()
				const localCart = JSON.parse(localStorage.getItem('cart') || '[]')
				const mergedCart = mergeCartItems(serverCart, localCart)
				await updateCartItems(mergedCart)
				localStorage.removeItem('cart')
			} else {
				const localCart = JSON.parse(localStorage.getItem('cart') || '[]')
				setCartItems(localCart)
			}
		}
		syncCart()
	}, [isLoggedIn])

	const cartQuantity = cartItems.reduce(
		(quantity, item) => item.quantity + quantity,
		0
	)

	const openCart = () => setIsOpen(true)
	const closeCart = () => setIsOpen(false)

	function getItemQuantity(id: string) {
		return cartItems.find((item) => item.id === id)?.quantity || 0
	}

	async function updateCartItems(newItems: CartItem[]) {
		if (isLoggedIn) {
			const updatedCart = await cartApi.updateCart(newItems)
			setCartItems(updatedCart)
		} else {
			setCartItems(newItems)
			localStorage.setItem('cart', JSON.stringify(newItems))
		}
	}

	async function increaseCartQuantity(id: string) {
		const currentQuantity = getItemQuantity(id)
		if (isLoggedIn) {
			const updatedCart = await cartApi.addOrUpdateItem(id, currentQuantity + 1)
			setCartItems(updatedCart)
		} else {
			const newItems = [
				...cartItems.filter((item) => item.id !== id),
				{ id, quantity: currentQuantity + 1 },
			]
			updateCartItems(newItems)
		}
	}

	async function decreaseCartQuantity(id: string) {
		const currentQuantity = getItemQuantity(id)
		if (currentQuantity === 1) {
			await removeFromCart(id)
		} else {
			if (isLoggedIn) {
				const updatedCart = await cartApi.addOrUpdateItem(
					id,
					currentQuantity - 1
				)
				setCartItems(updatedCart)
			} else {
				const newItems = [
					...cartItems.filter((item) => item.id !== id),
					{ id, quantity: currentQuantity - 1 },
				]
				updateCartItems(newItems)
			}
		}
	}

	async function removeFromCart(id: string) {
		if (isLoggedIn) {
			await cartApi.removeItem(id)
			const updatedCart = await cartApi.getCart()
			setCartItems(updatedCart)
		} else {
			updateCartItems(cartItems.filter((item) => item.id !== id))
		}
	}

	async function clearCart() {
		if (isLoggedIn) {
			await cartApi.clearCart()
			setCartItems([])
		} else {
			setCartItems([])
			localStorage.removeItem('cart')
		}
	}

	function mergeCartItems(
		serverCart: CartItem[],
		localCart: CartItem[]
	): CartItem[] {
		const mergedCart = [...serverCart]
		localCart.forEach((localItem) => {
			const existingItem = mergedCart.find((item) => item.id === localItem.id)
			if (existingItem) {
				existingItem.quantity += localItem.quantity
			} else {
				mergedCart.push(localItem)
			}
		})
		return mergedCart
	}

	return (
		<ShoppingCartContext.Provider
			value={{
				getItemQuantity,
				increaseCartQuantity,
				decreaseCartQuantity,
				removeFromCart,
				clearCart,
				openCart,
				closeCart,
				cartItems,
				cartQuantity,
				isOpen,
			}}
		>
			{children}
		</ShoppingCartContext.Provider>
	)
}
