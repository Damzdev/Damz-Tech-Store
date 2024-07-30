import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AddedItem from '../components/ItemAddedNotification'
import axios from 'axios'
import { formatPrice } from '../utils/formatCurrency'

export default function Orders() {
	const location = useLocation()
	const [showToast, setShowToast] = useState(false)
	const [toastMessage, setToastMessage] = useState('')
	const [orders, setOrders] = useState([])

	useEffect(() => {
		if (location.state?.showToast) {
			setToastMessage(location.state.message)
			setShowToast(true)
		}
	}, [location.state])

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const accessToken = localStorage.getItem('accessToken')
				if (!accessToken) {
					setToastMessage('Login required session expired!')
					setShowToast(true)
					return
				}

				const response = await axios.get(
					'http://localhost:3005/api/users-orders',
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				)
				setOrders(response.data)
			} catch (error) {
				console.error('Error fetching orders: ', error)
				setToastMessage('Error fetching orders')
				setShowToast(true)
			}
		}

		fetchOrders()
	}, [])

	return (
		<div className="bg-white p-10">
			<AddedItem
				show={showToast}
				onClose={() => setShowToast(false)}
				message={toastMessage}
			/>
			<h1 className="text-4xl font-bold mb-6">Your Orders</h1>
			<div className="bg-gray-300 p-6 rounded-lg shadow-md">
				<table className="min-w-full bg-gray-300">
					<thead>
						<tr>
							<th className="py-2 px-4 border-b-2 border-gray-200">Order ID</th>
							<th className="py-2 px-4 border-b-2 border-gray-200">Name</th>
							<th className="py-2 px-4 border-b-2 border-gray-200">Address</th>
							<th className="py-2 px-4 border-b-2 border-gray-200">Time</th>
							<th className="py-2 px-4 border-b-2 text-right border-gray-200">
								Total Price
							</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order.id}>
								<td className="py-2 px-4 border-b border-gray-200">
									{order.id}
								</td>
								<td className="py-2 px-4 border-b border-gray-200">
									{order.name}
								</td>
								<td className="py-2 px-4 border-b border-gray-200">
									{order.address}
								</td>
								<td className="py-2 px-4 border-b border-gray-200">
									{order.createdAt}
								</td>
								<td className="py-2 px-4 border-b border-gray-200 text-right">
									{`R${order.total}`}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
