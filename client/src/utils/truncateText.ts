export const truncateText = (text: string, numWords: number) => {
	if (!text) return ''
	const words = text.split(' ')
	return (
		words.slice(0, numWords).join(' ') + (words.length > numWords ? '...' : '')
	)
}
