// api.ts
import axios from 'axios'

const API_URL = 'http://localhost:3005/api'

type CartItem = {
	id: string
	quantity: number
}

const getAuthHeader = () => {
	const token = localStorage.getItem('accessToken')

	return { headers: { Authorization: `Bearer ${token}` } }
}

export const cartApi = {
	getCart: async (): Promise<CartItem[]> => {
		try {
			const response = await axios.get(`${API_URL}/cart`, getAuthHeader())
			if (response.status === 403) {
				console.warn(
					'User is not authorized to access the cart. Returning an empty cart.'
				)
				return []
			}

			return response.data.items
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.status === 403) {
				console.warn('User is not signed in. Cannot fetch cart.')
				return []
			} else {
				console.error('An error occurred while fetching the cart:', error)
				throw error
			}
		}
	},

	updateCart: async (cartItems: CartItem[]): Promise<CartItem[]> => {
		const response = await axios.put(
			`${API_URL}/cart`,
			{ items: cartItems },
			getAuthHeader()
		)
		return response.data.items
	},

	addOrUpdateItem: async (
		id: string,
		quantity: number
	): Promise<CartItem[]> => {
		const response = await axios.post(
			`${API_URL}/cart/item`,
			{ id, quantity },
			getAuthHeader()
		)
		return response.data.items
	},

	removeItem: async (itemId: string): Promise<void> => {
		await axios.delete(`${API_URL}/cart/item/${itemId}`, getAuthHeader())
	},

	clearCart: async (): Promise<void> => {
		await axios.delete(`${API_URL}/cart`, getAuthHeader())
	},
}
