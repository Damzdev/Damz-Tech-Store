'use client'

import { MegaMenu, Navbar } from 'flowbite-react'
import { Link } from 'react-router-dom'

export default function Components() {
	return (
		<MegaMenu className="p-0 mr-4 mb-4 bg-transparent">
			<div className="rounded">
				<Navbar.Toggle />
				<Navbar.Collapse>
					<Navbar.Link className=" p-0 rounded-none border-none">
						<MegaMenu.Dropdown
							className="bg-transparent border-none"
							toggle={<span>Components</span>}
						>
							<div className="absolute bg-gray-800 opacity-90 shadow-lg z-10 w-[750px] rounded-lg -left-10 hidden sm:flex">
								<div className="flex-1 p-3">
									<ul className="list-none p-0 m-0">
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
						</MegaMenu.Dropdown>
					</Navbar.Link>
				</Navbar.Collapse>
			</div>
		</MegaMenu>
	)
}
