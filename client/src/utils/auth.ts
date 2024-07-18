export const refreshToken = async () => {
	const refreshToken = localStorage.getItem('refreshToken')
	const response = await fetch('/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ token: refreshToken }),
	})

	const data = await response.json()
	if (data.accessToken) {
		localStorage.setItem('accessToken', data.accessToken)
	}
}
