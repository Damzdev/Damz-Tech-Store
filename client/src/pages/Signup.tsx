import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [error, setError] = useState('')

	const navigate = useNavigate()

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault()

		// Check if passwords match
		if (password !== confirmPassword) {
			setError('Passwords do not match')
			return
		}

		// Clear any previous errors
		setError('')

		// Proceed with form submission
		const response = await fetch('http://localhost:3005/api/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, email, password }),
		})

		const data = await response.json()
		console.log(data)

		// If signup is successful, navigate to the login page
		if (response.ok) {
			navigate('/login')
		} else {
			// Handle errors (e.g., display error message)
			setError(data.message || 'Signup failed')
		}
	}

	return (
		<div className="bg-gray-300 min-h-screen flex justify-center items-center">
			<div className="signup-container bg-white p-8 rounded-lg shadow-md max-w-md w-full">
				<h1 className="text-2xl font-bold mb-6 text-gray-800">Sign Up</h1>
				<form className="text-left" onSubmit={handleSubmit}>
					<h3 className="text-lg mb-2 text-gray-600">Name</h3>
					<input
						type="name"
						name="name"
						id="name"
						className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
						onChange={(e) => setName(e.target.value)}
						required
					/>
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
						className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<h3 className="text-lg mb-2 text-gray-600">Confirm Password</h3>
					<input
						type="password"
						name="confirmPassword"
						id="confirmPassword"
						className="w-full px-3 py-2 border border-gray-300 rounded-md mb-6 focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
					{error && <p className="text-red-500 mb-4">{error}</p>}
					<button
						type="submit"
						className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
					>
						Sign Up
					</button>
				</form>
				<h4 className="mt-6 text-sm text-gray-700">
					Already have an account?{' '}
					<Link to="/login" className="text-green-500 hover:underline">
						Login Here
					</Link>
				</h4>
			</div>
		</div>
	)
}
