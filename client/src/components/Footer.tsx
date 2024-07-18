import { Link } from 'react-router-dom'
import scrollToTop from '../utils/scrollToTop'
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
			<footer className="flex flex-col items-center text-white bg-footerbg m-0 p-5 sm:flex-row sm:justify-between sm:items-start sm:pt-10">
				<div className="flex flex-col items-center sm:items-start sm:mr-8 sm:pl-24">
					<h1 className="text-lime-400 text-4xl sm:text-left mb-8 sm:pl-16">
						Socials
					</h1>
					<div className="flex flex-col items-center sm:items-start sm:pl-14">
						<a
							className="flex items-center text-lime-400 mb-2 no-underline border-2 border-green-800 rounded-2xl p-2 w-full hover:bg-gray-700 sm: justify-start"
							href="https://x.com/home"
						>
							<img className="w-5 mr-2" src={twitter} alt="Twitter" />
							<div>Twitter</div>
						</a>
						<a
							className="flex items-center text-lime-400 mb-2 no-underline border-2 border-green-800 rounded-2xl p-2 w-full hover:bg-gray-700 sm: justify-start"
							href="https://www.instagram.com/"
						>
							<img className="w-5 mr-2" src={instagram} alt="Instagram" />
							<div>Instagram</div>
						</a>
						<a
							className="flex items-center text-lime-400 mb-2 no-underline border-2 border-green-800 rounded-2xl p-2 w-full hover:bg-gray-700 sm: justify-start"
							href="https://www.facebook.com/"
						>
							<img className="w-5 mr-2" src={facebook} alt="Facebook" />
							<div>Facebook</div>
						</a>
						<a
							className="flex items-center text-lime-400 mb-2 no-underline border-2 border-green-800 rounded-2xl p-2 w-full hover:bg-gray-700 sm: justify-start"
							href="https://www.tiktok.com/"
						>
							<img className="w-5 mr-2 " src={tiktok} alt="TikTok" />
							<div>TikTok</div>
						</a>
					</div>
				</div>
				<div className="flex flex-col items-center sm:mb-0 sm:w-full sm:max-w-1000 ">
					<h1 className="text-lime-400 text-4xl mt-4 sm:text-left mb-2 sm:mt-0">
						Quick Links
					</h1>
					<div className="flex flex-col items-center w-full mt-5 sm:flex-row sm:justify-between sm:max-w-800 sm:mt-8">
						<div className="flex flex-col items-center mb-5 sm:items-center sm:mb-0">
							<Link
								className="text-white font-bold hover:text-lime-400 "
								to="/components/cases"
								onClick={scrollToTop}
							>
								Computer Cases
							</Link>
							<Link
								className="text-white font-bold hover:text-lime-400"
								to="/components/headsets"
								onClick={scrollToTop}
							>
								Headsets
							</Link>
							<Link
								className="text-white font-bold hover:text-lime-400"
								to="/monitors"
								onClick={scrollToTop}
							>
								Monitors
							</Link>
							<Link
								className="text-white font-bold hover:text-lime-400"
								to="/components/keyboards"
								onClick={scrollToTop}
							>
								Keyboards
							</Link>
							<Link
								className="text-white font-bold hover:text-lime-400"
								to="/components/gaming-mouses"
								onClick={scrollToTop}
							>
								Gaming Mouses
							</Link>
							<Link
								className="text-white font-bold hover:text-lime-400"
								to="/gaming-chairs"
								onClick={scrollToTop}
							>
								Gaming Chairs
							</Link>
						</div>
						<div className="flex flex-col items-center mb-5 sm:items-center sm:mb-0">
							<Link
								className="text-white font-bold hover:text-lime-400"
								to="/FAQS"
								onClick={scrollToTop}
							>
								FAQS
							</Link>
							<Link
								className="text-white font-bold hover:text-lime-400"
								to="/Terms-and-Conditions"
								onClick={scrollToTop}
							>
								Terms & Conditions
							</Link>
							<Link
								className="text-white font-bold hover:text-lime-400"
								to="/Payment-Options"
								onClick={scrollToTop}
							>
								Payment Options
							</Link>
							<Link
								className="text-white font-bold hover:text-lime-400"
								to="/shipping"
								onClick={scrollToTop}
							>
								Shipping & Returns
							</Link>
							<Link
								className="text-white font-bold hover:text-lime-400"
								to="/Ordering-Info"
								onClick={scrollToTop}
							>
								Order Info
							</Link>
							<Link
								className="text-white font-bold hover:text-lime-400"
								to="/contact"
								onClick={scrollToTop}
							>
								Contact Us
							</Link>
						</div>
						<div className="flex flex-col items-center sm:items-center">
							<Link
								className="text-white font-bold hover:text-lime-400"
								to="/gaming-computers/AMD"
								onClick={scrollToTop}
							>
								AMD Computers
							</Link>
							<Link
								className="text-white font-bold hover:text-lime-400"
								to="/gaming-computers/intel"
								onClick={scrollToTop}
							>
								Intel Computers
							</Link>
							<Link
								className="text-white font-bold hover:text-lime-400"
								to="components/radeon-cards"
								onClick={scrollToTop}
							>
								Radeon Graphics Cards
							</Link>
							<Link
								className="text-white font-bold hover:text-lime-400"
								to="/components/nvidia-cards"
								onClick={scrollToTop}
							>
								Nvidia Graphics Cards
							</Link>
							<Link
								className="text-white font-bold hover:text-lime-400"
								to="/gaming-laptops/dell"
								onClick={scrollToTop}
							>
								Dell Laptops
							</Link>
							<Link
								className="text-white font-bold hover:text-lime-400"
								to="/gaming-laptops/msi"
								onClick={scrollToTop}
							>
								MSI Laptops
							</Link>
						</div>
					</div>
				</div>
				<div className="flex flex-col items-center sm:mr-12 ">
					<h1 className="text-lime-400 text-4xl mb-8 sm:text-left">
						Contact Us:
					</h1>
					<div className="flex flex-col items-center sm:items-start pl-14 pr-12">
						<div className="flex items-center mb-2">
							<img className="w-5 mr-2" src={location} alt="Location" />
							<p className="text-center text-xs sm:text-left">
								Damztech Pty Ltd. Sandton Business Park, Camdeboo Road,
								Bryanston, Johannesburg 2086, Gauteng, South Africa
							</p>
						</div>
						<div className="flex items-center mb-2">
							<img className="w-5 mr-2" src={phone} alt="Phone" />
							<p>(011) 641 841</p>
						</div>
						<div className="flex items-center mb-2">
							<img className="w-5 mr-2" src={phone} alt="Phone" />
							<p>(012) 894 401</p>
						</div>
						<div className="flex items-center mb-2">
							<img className="w-5 mr-2" src={email} alt="Email" />
							<p>sales@damztech.co.za</p>
						</div>
					</div>
				</div>
			</footer>
			<div className="bg-footerbg text-white text-center p-12 ">
				Copyright © 2024 - All rights reserved by DAMZTECH (Pty) Ltd
			</div>
		</>
	)
}
