import { Link, NavLink } from 'react-router-dom'
import '../styles/header.css'
import search from '../assets/header/search.png'

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
					placeholder="Search items here..."
				/>
			</div>
			<div className="user-actions">
				<NavLink className="user-signup" to="/login">
					Login
				</NavLink>
				<NavLink className="user-login" to="/sign-up">
					Sign Up
				</NavLink>
				<NavLink className="cart" to="cart">
					Cart
				</NavLink>
			</div>
		</header>
	)
}
