import '../styles/login.css'

export default function Login() {
	return (
		<div className="login-container">
			<h1>Login</h1>
			<form>
				<h3>Email</h3>
				<input type="email" name="" id="" />
				<h3>Password</h3>
				<input type="password" name="" id="" />
				<button type="submit">Login</button>
			</form>
			<h4>Don't have an account?</h4>
			<button className="signup-button">Sign Up Here</button>
		</div>
	)
}
