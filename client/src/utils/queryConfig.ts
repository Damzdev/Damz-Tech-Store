type Query = {
	staleTime: number
	cacheTime: number
	refetchOnWindowFocus: boolean
	refetchOnMount: boolean
	refetchOnReconnect: boolean
}

export const queryConfig: Query = {
	staleTime: 1000 * 60 * 15, // 15 minutes
	cacheTime: 1000 * 60 * 60, // 1 hour
	refetchOnWindowFocus: false,
	refetchOnMount: false,
	refetchOnReconnect: false,
}
