import { Link } from 'react-router-dom'
import '../styles/footer.css'
import twitter from '../assets/footer-icons/twitter.png'
import instagram from '../assets/footer-icons/instagram.png'
import tiktok from '../assets/footer-icons/tik-tok.png'
import facebook from '../assets/footer-icons/facebook.png'
import location from '../assets/footer-icons/location.png'
import phone from '../assets/footer-icons/phone-call.png'
import email from '../assets/footer-icons/mail.png'

export default function Footer() {
	return (
		<>
			<footer className="footer-container">
				<div className="socials-container">
					<h1 className="socials-title">Socials</h1>
					<div className="social-links-container">
						<a className="social-links" href="https://x.com/home">
							<img className="social-icons" src={twitter} alt="" />
							<div>Twitter</div>
						</a>
						<a className="social-links" href="https://www.instagram.com/">
							<img className="social-icons" src={instagram} alt="" />
							<div>Instagram</div>
						</a>
						<a className="social-links" href="https://www.facebook.com/">
							<img className="social-icons" src={facebook} alt="" />
							Facebook
						</a>
						<a className="social-links" href="https://www.tiktok.com/">
							<img className="social-icons" src={tiktok} alt="" />
							TikTok
						</a>
					</div>
				</div>
				<div className="quick-links-container">
					<h1 className="quick-links-title">Quick Links</h1>
					<div className="links-wrapper">
						<div className="product-links-1">
							<Link className="quick-links-text" to="/computer-cases">
								Computer Cases
							</Link>
							<Link className="quick-links-text" to="/headsets">
								Headsets
							</Link>
							<Link className="quick-links-text" to="/monitors">
								Monitors
							</Link>
							<Link className="quick-links-text" to="/keyboards">
								Keyboards
							</Link>
							<Link className="quick-links-text" to="/gaming-mouses">
								Gaming Mouses
							</Link>
							<Link className="quick-links-text" to="/gaming-chairs">
								Gaming Chairs
							</Link>
						</div>
						<div className="products-more-info">
							<Link className="quick-links-text" to="/FAQS">
								FAQS
							</Link>
							<Link className="quick-links-text" to="/Terms-and-Conditions">
								Terms & Conditions
							</Link>
							<Link className="quick-links-text" to="/Payment-Options">
								Payment Options
							</Link>
							<Link className="quick-links-text" to="/shipping">
								Shipping & Returns
							</Link>
							<Link className="quick-links-text" to="/Ordering-Info">
								Order Info
							</Link>
							<Link className="quick-links-text" to="/contact">
								Contact Us
							</Link>
						</div>
						<div className="product-links-2">
							<Link className="quick-links-text" to="/">
								Nvidia Computers
							</Link>
							<Link className="quick-links-text" to="/">
								Intel Computers
							</Link>
							<Link className="quick-links-text" to="/">
								AMD Graphics Cards
							</Link>
							<Link className="quick-links-text" to="/">
								Nvidia Graphics Cards
							</Link>
							<Link className="quick-links-text" to="/">
								Dell Laptops
							</Link>
							<Link className="quick-links-text" to="/">
								MSI Laptops
							</Link>
						</div>
					</div>
				</div>
				<div className="contactus-container">
					<h1 className="contact-title">Contact Us:</h1>
					<div className="contact-info-container">
						<div className="each-contact-row">
							<img className="contact-icons" src={location} alt="" />
							<p className="contact-items address">
								Damztech Pty Ltd. Sandton Business Park, Camdeboo Road ,
								Bryanston, Johannesburg 2086, Gauteng, South Africa
							</p>
						</div>
						<div className="each-contact-row">
							<img className="contact-icons" src={phone} alt="" />
							<p className="contact-items">(011) 641 841</p>
						</div>
						<div className="each-contact-row">
							<img className="contact-icons" src={phone} alt="" />
							<p className="contact-items">(012) 894 401</p>
						</div>
						<div className="each-contact-row">
							<img className="contact-icons" src={email} alt="" />
							<p className="contact-items">sales@damztech.co.za</p>
						</div>
					</div>
				</div>
			</footer>
			<p className="copyright">
				Copyright © 2024 - All rights reserved by DAMZTECH (Pty) Ltd
			</p>
		</>
	)
}
