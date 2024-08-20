import React from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'

type NotificationProps = {
	show: boolean
	onClose: () => void
	message: string
}

const AddedItem: React.FC<NotificationProps> = ({ show, onClose, message }) => {
	return (
		<ToastContainer
			className="fixed bottom-4 right-4 p-3 z-50" // Tailwind CSS classes for fixed positioning
		>
			<Toast show={show} onClose={onClose} delay={3000} autohide bg={'dark'}>
				<Toast.Header>
					<strong className="me-auto">Notification</strong>
				</Toast.Header>
				<Toast.Body className="text-white">{message}</Toast.Body>
			</Toast>
		</ToastContainer>
	)
}

export default AddedItem
