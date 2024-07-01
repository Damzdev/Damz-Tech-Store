import { Link } from 'react-router-dom'
import '../styles/header.css'

export default function Footer() {
	return (
		<>
			<footer className="footer-container">
				<h1 className="socials-title">Socials</h1>
				<div className="socials-container">
					<a href="https://x.com/home">Twitter</a>
					<a href="https://www.instagram.com/">Instagram</a>
					<a href="https://www.facebook.com/">Facebook</a>
					<a href="https://www.tiktok.com/">TikTok</a>
				</div>
				<div className="products-more-info">
					<Link to="/gaming-computers">Gaming Computers</Link>
					<Link to="/FAQ">FAQ</Link>
				</div>
				<h1 className="contact-title">Contact Us:</h1>
				<div className="contact-info">
					<p>Random Address</p>
					<p>(011) 456 789</p>
					<p>(011) 123 456</p>
					<p>sales@damztech.co.za</p>
				</div>
			</footer>
			<p className="copyright">
				Copyright © 2024 - All rights reserved by DAMZTECH (Pty) Ltd
			</p>
		</>
	)
}
