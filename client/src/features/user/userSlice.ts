import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isLoggedIn: false,
	accessToken: null,
	refreshToken: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.isLoggedIn = true
			state.accessToken = action.payload.accessToken
			state.refreshToken = action.payload.refreshToken
		},
		logout: (state) => {
			state.isLoggedIn = false
			state.accessToken = null
			state.refreshToken = null
		},
	},
})

export const { loginSuccess, logout } = authSlice.actions

export default authSlice.reducer

export const refreshToken = async () => {
	const refreshToken = localStorage.getItem('refreshToken')
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
		return data.accessToken
	}
	return null
}
