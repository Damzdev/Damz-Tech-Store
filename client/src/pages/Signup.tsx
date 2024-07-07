import { Link } from 'react-router-dom'
import '../styles/signup.css'

export default function Signup() {
	return (
		<div className="signup-container">
			<h1>Sign Up</h1>
			<form>
				<h3>Email</h3>
				<input type="email" name="" id="" />
				<h3>Password</h3>
				<input type="password" name="" id="" />
				<h3>Confirm Password</h3>
				<input type="password" name="" id="" />
				<button type="submit">Sign Up</button>
			</form>
			<h4>Already have an account?</h4>
			<Link className="login-link " to="/login">
				Login Here
			</Link>
		</div>
	)
}
