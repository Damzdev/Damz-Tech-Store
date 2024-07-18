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
			position="top-end"
			className="p-3"
			style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 1050 }}
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
