import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Components() {
	const [show, setShow] = useState(false)

	const toggleShow = () => {
		setShow(!show)
	}

	return (
		<>
			<button
				className={`${show ? 'underline underline-offset-4 mr-5' : 'mr-5'}`}
				onClick={toggleShow}
			>
				Components
			</button>
			<div className="relative inline-block mt-8">
				{show && (
					<div className="absolute bg-gray-800 opacity-90 shadow-lg z-10 mt-2 w-[750px] rounded-lg -left-36 hidden sm:flex">
						<div className="flex-1 p-3">
							<ul className="list-none p-0">
								<li className="my-2">
									<Link
										to="/components/intel-processors"
										className="text-white hover:text-lime-400"
									>
										CPU Processors (Intel)
									</Link>
								</li>
								<li className="my-2">
									<Link
										to="/components/AMD-processors"
										className="text-white hover:text-lime-400"
									>
										CPU Processors (AMD)
									</Link>
								</li>
								<li className="my-2">
									<Link
										to="/components/processor-coolers"
										className="text-white hover:text-lime-400"
									>
										CPU Coolers
									</Link>
								</li>
								<li className="my-2">
									<Link
										to="/components/nvidia-cards"
										className="text-white hover:text-lime-400"
									>
										Graphics Cards (Nvidia)
									</Link>
								</li>
								<li className="my-2">
									<Link
										to="/components/radeon-cards"
										className="text-white hover:text-lime-400"
									>
										Graphics Cards (Radeon)
									</Link>
								</li>
							</ul>
						</div>
						<div className="flex-1 p-3">
							<ul className="list-none p-0">
								<li className="my-2">
									<Link
										to="/components/hard-drives"
										className="text-white hover:text-lime-400"
									>
										Hard Drives
									</Link>
								</li>
								<li className="my-2">
									<Link
										to="/components/keyboards"
										className="text-white hover:text-lime-400"
									>
										Keyboards
									</Link>
								</li>
								<li className="my-2">
									<Link
										to="/components/ram-memory"
										className="text-white hover:text-lime-400"
									>
										Memory (RAM)
									</Link>
								</li>
								<li className="my-2">
									<Link
										to="/components/intel-motherboards"
										className="text-white hover:text-lime-400"
									>
										Motherboards (Intel)
									</Link>
								</li>
								<li className="my-2">
									<Link
										to="/components/AMD-motherboards"
										className="text-white hover:text-lime-400"
									>
										Motherboards (AMD)
									</Link>
								</li>
							</ul>
						</div>
						<div className="flex-1 p-3">
							<ul className="list-none p-0">
								<li className="my-2">
									<Link
										to="/components/gaming-mouses"
										className="text-white hover:text-lime-400"
									>
										Mouses
									</Link>
								</li>
								<li className="my-2">
									<Link
										to="/components/power-supply-units"
										className="text-white hover:text-lime-400"
									>
										Power Supply
									</Link>
								</li>
								<li className="my-2">
									<Link
										to="/components/cases"
										className="text-white hover:text-lime-400"
									>
										PC Case
									</Link>
								</li>
								<li className="my-2">
									<Link
										to="/components/SSD"
										className="text-white hover:text-lime-400"
									>
										SSD
									</Link>
								</li>
								<li className="my-2">
									<Link
										to="/components/operating-system"
										className="text-white hover:text-lime-400"
									>
										Operating System
									</Link>
								</li>
							</ul>
						</div>
					</div>
				)}
			</div>
		</>
	)
}
