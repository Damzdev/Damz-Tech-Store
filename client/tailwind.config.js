/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			screens: {
				sm: '640px',

				md: '768px',

				lg: '1024px',

				xl: '1280px',

				'2xl': '1536px',
			},
			width: {
				750: '750px',
			},
			height: {
				800: '800px',
			},
			maxWidth: {
				800: '600px',
				1000: '1000px',
			},
			colors: {
				footerbg: '#090A24',
			},
			backgroundImage: {
				'gradient-radial-circle-gray':
					'radial-gradient(circle, #4f4f4f, #2c2c2c)',
			},
		},
	},
	plugins: [],
}
