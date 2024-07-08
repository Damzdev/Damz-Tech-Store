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
										to="/cpu-processor/intel"
										className="text-white hover:text-lime-400"
									>
										CPU Processors (Intel)
									</Link>
								</li>
								<li className="my-2">
									<Link
										to="/cpu-processor/amd"
										className="text-white hover:text-lime-400"
									>
										CPU Processors (AMD)
									</Link>
								</li>
								<li className="my-2">
									<Link
										to="/cpu-coolers"
										className="text-white hover:text-lime-400"
									>
										CPU Coolers
									</Link>
								</li>
								<li className="my-2">
									<Link
										to="/graphics-cards/nvidia"
										className="text-white hover:text-lime-400"
									>
										Graphics Cards (Nvidia)
									</Link>
								</li>
								<li className="my-2">
									<Link
										to="/graphics-cards/radeon"
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
										to="/hard-drives"
										className="text-white hover:text-lime-400"
									>
										Hard Drives
									</Link>
								</li>
								<li className="my-2">
									<Link
										to="/keyboards"
										className="text-white hover:text-lime-400"
									>
										Keyboards
									</Link>
								</li>
								<li className="my-2">
									<Link
										to="/ram-memory"
										className="text-white hover:text-lime-400"
									>
										Memory (RAM)
									</Link>
								</li>
								<li className="my-2">
									<Link
										to="/motherboards/intel"
										className="text-white hover:text-lime-400"
									>
										Motherboards (Intel)
									</Link>
								</li>
								<li className="my-2">
									<Link
										to="/motherboards/amd"
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
										to="/monitors"
										className="text-white hover:text-lime-400"
									>
										Monitors
									</Link>
								</li>
								<li className="my-2">
									<Link
										to="/power-supply"
										className="text-white hover:text-lime-400"
									>
										Power Supply
									</Link>
								</li>
								<li className="my-2">
									<Link
										to="/pc-case"
										className="text-white hover:text-lime-400"
									>
										PC Case
									</Link>
								</li>
								<li className="my-2">
									<Link to="/SSDs" className="text-white hover:text-lime-400">
										SSD
									</Link>
								</li>
								<li className="my-2">
									<Link
										to="/operating-system"
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
