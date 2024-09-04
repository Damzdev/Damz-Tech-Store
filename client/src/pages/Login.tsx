import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginSuccess } from '../features/user/userSlice'
import AddedItem from '../components/ItemAddedNotification'

export default function Login() {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [showToast, setShowToast] = useState<boolean>(false)
	const [toastMessage, setToastMessage] = useState<string>('')
	const [loginError, setLoginError] = useState<string>('')
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault()
		await loginUser(email, password)
	}

	const loginUser = async (email: string, password: string) => {
		const response = await fetch(
			'https://damz-tech-store-api.onrender.com/api/login',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			}
		)

		const data = await response.json()
		if (data.accessToken && data.refreshToken) {
			localStorage.setItem('accessToken', data.accessToken)
			localStorage.setItem('refreshToken', data.refreshToken)
			dispatch(
				loginSuccess({
					accessToken: data.accessToken,
					refreshToken: data.refreshToken,
				})
			)
			setToastMessage('Login successful')
			setShowToast(true)
			setTimeout(() => {
				navigate('/')
			}, 1500)
		} else {
			setToastMessage('Login failed')
			setShowToast(true)
			setLoginError('No existing user found!')
		}
	}

	const handleGuestLogin = async () => {
		const guestEmail = 'test@test.com'
		const guestPassword = 'test123'
		await loginUser(guestEmail, guestPassword)
	}

	return (
		<div className="bg-gray-300 min-h-screen flex justify-center items-center">
			<AddedItem
				show={showToast}
				onClose={() => setShowToast(false)}
				message={toastMessage}
			/>
			<div className="login-container bg-white p-8 rounded-lg shadow-md max-w-md w-full">
				<h1 className="text-2xl font-bold mb-6 text-gray-800">Login</h1>
				<form className="text-left" onSubmit={handleSubmit}>
					<h3 className="text-lg mb-2 text-gray-600">Email</h3>
					<input
						type="email"
						name="email"
						id="email"
						className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<h3 className="text-lg mb-2 text-gray-600">Password</h3>
					<input
						type="password"
						name="password"
						id="password"
						className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					{loginError && (
						<p className="text-red-500 text-sm font-bold mb-4">{loginError}</p>
					)}
					<button
						type="submit"
						className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
					>
						Login
					</button>
				</form>
				<button
					onClick={handleGuestLogin}
					className="w-full bg-green-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-green-600"
				>
					Guest User
				</button>
				<h4 className="mt-6 text-sm text-gray-700">
					Don't have an account?{' '}
					<Link to="/signup" className="text-green-500 hover:underline">
						Sign Up Here
					</Link>
				</h4>
			</div>
		</div>
	)
}
