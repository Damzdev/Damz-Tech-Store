import { Link, NavLink } from 'react-router-dom'
import '../styles/header.css'
import search from '../assets/header/search.png'
import cart from '../assets/shopping-cart.png'

export default function Header() {
	return (
		<header className="header-main">
			<Link className="logo" to="/">
				Damz Tech Store
			</Link>
			<div className="searchbar-container">
				<button className="search-icon">
					<img src={search} className="search-img" />
				</button>
				<input
					type="text"
					name=""
					id=""
					className="searchbar"
					placeholder="Search..."
				/>
			</div>
			<div className="user-actions">
				<NavLink className="user-signup" to="/login">
					Login
				</NavLink>
				<NavLink className="user-login" to="/signup">
					Sign Up
				</NavLink>
				<div className="cart-container">
					<a href="/cart" className="cart-items">
						1
					</a>
					<NavLink className="cart" to="cart">
						<img src={cart} alt="cart-icon" className="cart-icon" />
						Cart
					</NavLink>
				</div>
			</div>
		</header>
	)
}
