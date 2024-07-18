import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault()
		const response = await fetch('http://localhost:3005/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		})

		const data = await response.json()
		if (data.accessToken && data.refreshToken) {
			localStorage.setItem('accessToken', data.accessToken)
			localStorage.setItem('refreshToken', data.refreshToken)
			console.log('Login successful')
		} else {
			console.log('Login failed')
		}
	}
	return (
		<div className="bg-f4f4f9 min-h-screen flex justify-center items-center">
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
						className="w-full px-3 py-2 border border-gray-300 rounded-md mb-6 focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<button
						type="submit"
						className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
					>
						Login
					</button>
				</form>
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
