export const refreshToken = async () => {
	const refreshToken: string | null = localStorage.getItem('refreshToken')
	const response = await fetch(
		'https://damz-tech-store-api.onrender.com/api/token',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ token: refreshToken }),
		}
	)

	const data = await response.json()
	if (data.accessToken) {
		localStorage.setItem('accessToken', data.accessToken)
	}
}
