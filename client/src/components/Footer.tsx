import { Link } from 'react-router-dom'
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
					<div className="flex flex-col items-center sm:items-start sm:pl-14 ">
						<a
							className="flex items-center text-lime-400 mb-2 border-2 border-green-800 rounded-2xl p-2 w-full hover:bg-gray-700 sm: justify-start"
							href="https://x.com/home"
						>
							<img className="w-5 mr-2" src={twitter} alt="Twitter" />
							<div>Twitter</div>
						</a>
						<a
							className="flex items-center text-lime-400 mb-2 border-2 border-green-800 rounded-2xl p-2 w-full hover:bg-gray-700 sm: justify-start"
							href="https://www.instagram.com/"
						>
							<img className="w-5 mr-2" src={instagram} alt="Instagram" />
							<div>Instagram</div>
						</a>
						<a
							className="flex items-center text-lime-400 mb-2 border-2 border-green-800 rounded-2xl p-2 w-full hover:bg-gray-700 sm: justify-start"
							href="https://www.facebook.com/"
						>
							<img className="w-5 mr-2" src={facebook} alt="Facebook" />
							<div>Facebook</div>
						</a>
						<a
							className="flex items-center text-lime-400 mb-2 border-2 border-green-800 rounded-2xl p-2 w-full hover:bg-gray-700 sm: justify-start"
							href="https://www.tiktok.com/"
						>
							<img className="w-5 mr-2 " src={tiktok} alt="TikTok" />
							<div>TikTok</div>
						</a>
					</div>
				</div>
				<div className="flex flex-col items-center sm:mb-0 sm:w-full sm:max-w-1000 sm:ml-10">
					<h1 className="text-lime-400 text-4xl mt-4 sm:text-left mb-2 sm:mt-0">
						Quick Links
					</h1>
					<div className="flex flex-col items-center w-full mt-5 sm:flex-row sm:justify-between sm:max-w-800 sm:mt-8">
						<div className="flex flex-col items-center mb-5 sm:items-center sm:mb-0">
							<Link
								className="text-white font-bold hover:text-lime-400 sm: mb-1"
								to="/computer-cases"
							>
								Computer Cases
							</Link>
							<Link
								className="text-white font-bold hover:text-lime-400"
								to="/headsets"
							>
								Headsets
							</Link>
							<Link
								className="text-white font-bold hover:text-lime-400"
								to="/monitors"
							>
								Monitors
							</Link>
							<Link
								className="text-white font-bold hover:text-lime-400"
								to="/keyboards"
							>
								Keyboards
							</Link>
							<Link
								className="text-white font-bold hover:text-lime-400"
								to="/gaming-mouses"
							>
								Gaming Mouses
							</Link>
							<Link
								className="text-white font-bold hover:text-lime-400"
								to="/gaming-chairs"
							>
								Gaming Chairs
							</Link>
						</div>
						<div className="flex flex-col items-center mb-5 sm:items-center sm:mb-0">
							<Link
								className="text-white font-bold hover:text-lime-400"
								to="/FAQS"
							>
								FAQS
							</Link>
							<Link
								className="text-white font-bold hover:text-lime-400"
								to="/Terms-and-Conditions"
							>
								Terms & Conditions
							</Link>
							<Link
								className="text-white font-bold hover:text-lime-400"
								to="/Payment-Options"
							>
								Payment Options
							</Link>
							<Link
								className="text-white font-bold hover:text-lime-400"
								to="/shipping"
							>
								Shipping & Returns
							</Link>
							<Link
								className="text-white font-bold hover:text-lime-400"
								to="/Ordering-Info"
							>
								Order Info
							</Link>
							<Link
								className="text-white font-bold hover:text-lime-400"
								to="/contact"
							>
								Contact Us
							</Link>
						</div>
						<div className="flex flex-col items-center sm:items-center mb-4">
							<Link
								className="text-white font-bold hover:text-lime-400"
								to="/gaming-computers/AMD"
							>
								AMD Computers
							</Link>
							<Link
								className="text-white font-bold hover:text-lime-400"
								to="/gaming-computers/intel"
							>
								Intel Computers
							</Link>
							<Link
								className="text-white font-bold hover:text-lime-400"
								to="/graphics-cards/AMD"
							>
								AMD Graphics Cards
							</Link>
							<Link
								className="text-white font-bold hover:text-lime-400"
								to="/graphics-cards/nvidia"
							>
								Nvidia Graphics Cards
							</Link>
							<Link
								className="text-white font-bold hover:text-lime-400"
								to="/gaming-laptops/dell"
							>
								Dell Laptops
							</Link>
							<Link
								className="text-white font-bold hover:text-lime-400"
								to="/gaming-laptops/msi"
							>
								MSI Laptops
							</Link>
						</div>
					</div>
				</div>
				<div className="flex flex-col items-center sm:mr-12 ">
					<h1 className="text-lime-400 text-4xl mb-4 sm:text-left">
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
			<p className="bg-footerbg text-white text-center p-12">
				Copyright © 2024 - All rights reserved by DAMZTECH (Pty) Ltd
			</p>
		</>
	)
}
