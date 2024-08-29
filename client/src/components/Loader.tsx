import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'

interface LoaderProps {
	delay?: number
	fadeOutDuration?: number
}

export default function Loader({
	delay = 1000,
	fadeOutDuration = 200,
}: LoaderProps) {
	const [fadeOut, setFadeOut] = useState<boolean>(false)
	const [hidden, setHidden] = useState<boolean>(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			setFadeOut(true)
			setTimeout(() => {
				setHidden(true)
			}, fadeOutDuration)
		}, delay)

		return () => clearTimeout(timer)
	}, [delay, fadeOutDuration])

	return (
		!hidden && (
			<div
				className={`flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black z-[9999] ${
					fadeOut ? 'opacity-0 transition-opacity duration-200' : 'opacity-100'
				}`}
			>
				<Spinner
					animation="border"
					variant="primary"
					role="status"
					className="w-[60px] h-[60px]"
				>
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			</div>
		)
	)
}
