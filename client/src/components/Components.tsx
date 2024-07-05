// Components.tsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/components-block.css'

export default function Components() {
	const [show, setShow] = useState(false)

	const toggleShow = () => {
		setShow(!show)
	}

	return (
		<>
			<button
				className={show ? 'components-active' : 'components'}
				onClick={toggleShow}
			>
				Components
			</button>
			<div className="components-container">
				{show && (
					<div className="mega-menu">
						<div className="mega-menu-column">
							<ul>
								<li>
									<Link to="/cpu-processor/intel">CPU Processors (Intel)</Link>
								</li>
								<li>
									<Link to="/cpu-processor/amd">CPU Processors (AMD)</Link>
								</li>
								<li>
									<Link to="/cpu-coolers">CPU Coolers</Link>
								</li>
								<li>
									<Link to="/graphics-cards/nvidia">
										Graphics Cards (Nvidia)
									</Link>
								</li>
								<li>
									<Link to="/graphics-cards/radeon">
										Graphics Cards (Radeon)
									</Link>
								</li>
							</ul>
						</div>
						<div className="mega-menu-column">
							<ul>
								<li>
									<Link to="/hard-drives">Hard Drives</Link>
								</li>
								<li>
									<Link to="/keyboards">Keyboards</Link>
								</li>
								<li>
									<Link to="/ram-memory">Memory (RAM)</Link>
								</li>
								<li>
									<Link to="/motherboards/intel">Motherboards (Intel)</Link>
								</li>
								<li>
									<Link to="/motherboards/amd">Motherboards (AMD)</Link>
								</li>
							</ul>
						</div>
						<div className="mega-menu-column">
							<ul>
								<li>
									<Link to="/monitors">Monitors</Link>
								</li>
								<li>
									<Link to="/power-supply">Power Supply</Link>
								</li>
								<li>
									<Link to="/pc-case">PC Case</Link>
								</li>
								<li>
									<Link to="/SSDs">SSD</Link>
								</li>
								<li>
									<Link to="/operating-system">Operating-System</Link>
								</li>
							</ul>
						</div>
					</div>
				)}
			</div>
		</>
	)
}
