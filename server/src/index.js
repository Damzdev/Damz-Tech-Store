const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { db } = require('./firebaseAdmin')
const fs = require('fs').promises
const path = require('path')
const { v4: uuidv4 } = require('uuid')
require('dotenv').config()

const app = express()
const port = 3005

const collections = [
	'AMD-Gaming-Pcs',
	'Intel-Gaming-Pcs',
	'intel-processors',
	'amd-processors',
	'cpu-coolers',
	'nvidia-GPU',
	'radeon-GPU',
	'hard-drives',
	'keyboards',
	'ram-memory',
	'intel-motherboards',
	'amd-motherboards',
	'mouses',
	'power-supplys',
	'pc-cases',
	'operating-system',
	'SSD',
	'dell-gaming-laptops',
	'acer-gaming-laptops',
	'asus-gaming-laptops',
	'hp-gaming-laptops',
	'lenovo-gaming-laptops',
	'msi-gaming-laptops',
	'monitors',
	'gaming-chairs',
]

const orders = []

app.use(
	cors({
		origin: 'http://localhost:5174',
		methods: ['GET', 'POST'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
)
app.use(express.json())

const SECRET_KEY = process.env.SECRET_KEY
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY
const accessTokenExpiry = '1d'
const refreshTokenExpiry = '30d'

// Generate JWT token
const generateAccessToken = (user) => {
	return jwt.sign(user, SECRET_KEY, { expiresIn: accessTokenExpiry })
}

const generateRefreshToken = (user) => {
	return jwt.sign(user, REFRESH_SECRET_KEY, { expiresIn: refreshTokenExpiry })
}

// Register
app.post('/api/signup', async (req, res) => {
	const { name, email, password } = req.body

	try {
		const hashedPassword = await bcrypt.hash(password, 10)
		await db.collection('users').add({
			name,
			email,
			password: hashedPassword,
		})

		res.status(201).json({ message: 'User signed up successfully' })
	} catch (error) {
		res.status(500).json({ message: 'Error registering user', error })
	}
})

// Login
app.post('/api/login', async (req, res) => {
	const { email, password } = req.body

	try {
		const usersRef = db.collection('users')
		const snapshot = await usersRef.where('email', '==', email).get()

		if (snapshot.empty) {
			return res.status(400).json({ message: 'User not found' })
		}

		let user = null
		snapshot.forEach((doc) => {
			user = { id: doc.id, ...doc.data() }
		})

		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid credentials' })
		}

		const accessToken = generateAccessToken({ id: user.id, email: user.email })
		const refreshToken = generateRefreshToken({
			id: user.id,
			email: user.email,
		})

		res.json({ accessToken, refreshToken })
	} catch (error) {
		res.status(500).json({ message: 'Error logging in user', error })
	}
})

// Refresh Token
app.post('/api/token', (req, res) => {
	const { token } = req.body

	if (!token) {
		return res.sendStatus(401)
	}

	jwt.verify(token, REFRESH_SECRET_KEY, (err, user) => {
		if (err) {
			return res.sendStatus(403)
		}

		const accessToken = generateAccessToken({ id: user.id, email: user.email })
		res.json({ accessToken })
	})
})

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	if (!token) return res.sendStatus(401)

	jwt.verify(token, SECRET_KEY, (err, user) => {
		if (err) return res.sendStatus(403)
		req.user = user
		next()
	})
}

app.get('/api/users', authenticateToken, async (req, res) => {
	try {
		const userRef = db.collection('users').doc(req.user.id)
		const doc = await userRef.get()

		if (!doc.exists) {
			return res.status(404).json({ message: 'User not found' })
		}

		const user = {
			...doc.data(),
			id: doc.id,
		}

		res.json(user)
	} catch (error) {
		console.error('Error fetching user data: ', error)
		res.status(500).send('Error fetching user data')
	}
})

app.post('/api/orders', authenticateToken, async (req, res) => {
	try {
		const { name, address, productIds, totalPrice } = req.body
		const userId = req.user.id

		const now = new Date()
		const formattedDate = now.toDateString()
		const formattedTime = now.toTimeString().split(' ')[0]

		const result = `${formattedDate} ${formattedTime}`

		const newOrder = {
			id: uuidv4(),
			userId,
			name,
			productIds,
			address: address,
			createdAt: result,
			total: totalPrice,
		}
		await db.collection('orders').doc(newOrder.id).set(newOrder)

		res
			.status(201)
			.json({ message: 'Order placed successfully', order: newOrder })
	} catch (error) {
		console.error('Error saving order: ', error)
		res.status(500).send('Error saving order')
	}
})

app.get('/api/users-orders', authenticateToken, async (req, res) => {
	try {
		const userId = req.user.id
		const ordersRef = db.collection('orders').where('userId', '==', userId)
		const snapshot = await ordersRef.get()

		if (snapshot.empty) {
			return res.status(404).json({ message: 'No orders found for this user' })
		}

		const orders = snapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}))

		res.json(orders)
	} catch (error) {
		console.error('Error fetching user orders: ', error)
		res.status(500).send('Error fetching user orders')
	}
})

// Your existing routes
app.get('/api/gaming-pcs/amd', async (req, res) => {
	try {
		const querySnapshot = await db.collection('AMD-Gaming-Pcs').get()
		const docs = querySnapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}))
		res.json(docs)
	} catch (error) {
		console.error('Error fetching data: ', error)
		res.status(500).send('Error fetching data')
	}
})

// Add the same authenticateToken middleware to your other routes
app.get('/api/gaming-pcs/intel', async (req, res) => {
	try {
		const querySnapshot = await db.collection('Intel-Gaming-Pcs').get()
		const docs = querySnapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}))
		res.json(docs)
	} catch (error) {
		console.error('Error fetching data: ', error)
		res.status(500).send('Error fetching data')
	}
})

app.get('/api/components/intel-processors', async (req, res) => {
	try {
		const querySnapshot = await db.collection('intel-processors').get()
		const docs = querySnapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}))
		res.json(docs)
	} catch (error) {
		console.error('Error fetching data: ', error)
		res.status(500).send('Error fetching data')
	}
})

app.get('/api/components/amd-processors', async (req, res) => {
	try {
		const querySnapshot = await db.collection('amd-processors').get()
		const docs = querySnapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}))
		res.json(docs)
	} catch (error) {
		console.error('Error fetching data: ', error)
		res.status(500).send('Error fetching data')
	}
})

app.get('/api/components/cpu-coolers', async (req, res) => {
	try {
		const querySnapshot = await db.collection('cpu-coolers').get()
		const docs = querySnapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}))
		res.json(docs)
	} catch (error) {
		console.error('Error fetching data: ', error)
		res.status(500).send('Error fetching data')
	}
})

app.get('/api/components/nvidia-gpu', async (req, res) => {
	try {
		const querySnapshot = await db.collection('nvidia-GPU').get()
		const docs = querySnapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}))
		res.json(docs)
	} catch (error) {
		console.error('Error fetching data: ', error)
		res.status(500).send('Error fetching data')
	}
})

app.get('/api/components/radeon-gpu', async (req, res) => {
	try {
		const querySnapshot = await db.collection('radeon-GPU').get()
		const docs = querySnapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}))
		res.json(docs)
	} catch (error) {
		console.error('Error fetching data: ', error)
		res.status(500).send('Error fetching data')
	}
})

app.get('/api/components/hard-drives', async (req, res) => {
	try {
		const querySnapshot = await db.collection('hard-drives').get()
		const docs = querySnapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}))
		res.json(docs)
	} catch (error) {
		console.error('Error fetching data: ', error)
		res.status(500).send('Error fetching data')
	}
})

app.get('/api/components/keyboards', async (req, res) => {
	try {
		const querySnapshot = await db.collection('keyboards').get()
		const docs = querySnapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}))
		res.json(docs)
	} catch (error) {
		console.error('Error fetching data: ', error)
		res.status(500).send('Error fetching data')
	}
})

app.get('/api/components/ram-memory', async (req, res) => {
	try {
		const querySnapshot = await db.collection('ram-memory').get()
		const docs = querySnapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}))
		res.json(docs)
	} catch (error) {
		console.error('Error fetching data: ', error)
		res.status(500).send('Error fetching data')
	}
})

app.get(
	'/api/components/intel-motherboards',

	async (req, res) => {
		try {
			const querySnapshot = await db.collection('intel-motherboards').get()
			const docs = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}))
			res.json(docs)
		} catch (error) {
			console.error('Error fetching data: ', error)
			res.status(500).send('Error fetching data')
		}
	}
)

app.get(
	'/api/components/amd-motherboards',

	async (req, res) => {
		try {
			const querySnapshot = await db.collection('amd-motherboards').get()
			const docs = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}))
			res.json(docs)
		} catch (error) {
			console.error('Error fetching data: ', error)
			res.status(500).send('Error fetching data')
		}
	}
)

app.get('/api/components/mouses', async (req, res) => {
	try {
		const querySnapshot = await db.collection('mouses').get()
		const docs = querySnapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}))
		res.json(docs)
	} catch (error) {
		console.error('Error fetching data: ', error)
		res.status(500).send('Error fetching data')
	}
})

app.get(
	'/api/components/power-supplys',

	async (req, res) => {
		try {
			const querySnapshot = await db.collection('power-supplys').get()
			const docs = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}))
			res.json(docs)
		} catch (error) {
			console.error('Error fetching data: ', error)
			res.status(500).send('Error fetching data')
		}
	}
)

app.get('/api/components/pc-cases', async (req, res) => {
	try {
		const querySnapshot = await db.collection('pc-cases').get()
		const docs = querySnapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}))
		res.json(docs)
	} catch (error) {
		console.error('Error fetching data: ', error)
		res.status(500).send('Error fetching data')
	}
})

app.get(
	'/api/components/operating-system',

	async (req, res) => {
		try {
			const querySnapshot = await db.collection('operating-system').get()
			const docs = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}))
			res.json(docs)
		} catch (error) {
			console.error('Error fetching data: ', error)
			res.status(500).send('Error fetching data')
		}
	}
)

app.get('/api/components/SSD', async (req, res) => {
	try {
		const querySnapshot = await db.collection('SSD').get()
		const docs = querySnapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}))
		res.json(docs)
	} catch (error) {
		console.error('Error fetching data: ', error)
		res.status(500).send('Error fetching data')
	}
})

app.get(
	'/api/dell-gaming-laptops',

	async (req, res) => {
		try {
			const querySnapshot = await db.collection('dell-gaming-laptops').get()
			const docs = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}))
			res.json(docs)
		} catch (error) {
			console.error('Error fetching data: ', error)
			res.status(500).send('Error fetching data')
		}
	}
)

app.get(
	'/api/acer-gaming-laptops',

	async (req, res) => {
		try {
			const querySnapshot = await db.collection('acer-gaming-laptops').get()
			const docs = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}))
			res.json(docs)
		} catch (error) {
			console.error('Error fetching data: ', error)
			res.status(500).send('Error fetching data')
		}
	}
)

app.get(
	'/api/asus-gaming-laptops',

	async (req, res) => {
		try {
			const querySnapshot = await db.collection('asus-gaming-laptops').get()
			const docs = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}))
			res.json(docs)
		} catch (error) {
			console.error('Error fetching data: ', error)
			res.status(500).send('Error fetching data')
		}
	}
)

app.get(
	'/api/hp-gaming-laptops',

	async (req, res) => {
		try {
			const querySnapshot = await db.collection('hp-gaming-laptops').get()
			const docs = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}))
			res.json(docs)
		} catch (error) {
			console.error('Error fetching data: ', error)
			res.status(500).send('Error fetching data')
		}
	}
)

app.get(
	'/api/lenovo-gaming-laptops',

	async (req, res) => {
		try {
			const querySnapshot = await db.collection('lenovo-gaming-laptops').get()
			const docs = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}))
			res.json(docs)
		} catch (error) {
			console.error('Error fetching data: ', error)
			res.status(500).send('Error fetching data')
		}
	}
)

app.get(
	'/api/msi-gaming-laptops',

	async (req, res) => {
		try {
			const querySnapshot = await db.collection('msi-gaming-laptops').get()
			const docs = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}))
			res.json(docs)
		} catch (error) {
			console.error('Error fetching data: ', error)
			res.status(500).send('Error fetching data')
		}
	}
)

app.get('/api/monitors', async (req, res) => {
	try {
		const querySnapshot = await db.collection('monitors').get()
		const docs = querySnapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}))
		res.json(docs)
	} catch (error) {
		console.error('Error fetching data: ', error)
		res.status(500).send('Error fetching data')
	}
})

app.get('/api/gaming-chairs', async (req, res) => {
	try {
		const querySnapshot = await db.collection('gaming-chairs').get()
		const docs = querySnapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}))
		res.json(docs)
	} catch (error) {
		console.error('Error fetching data: ', error)
		res.status(500).send('Error fetching data')
	}
})

app.get('/api/all-products', async (req, res) => {
	try {
		const filePath = path.join(__dirname, './', 'all-products.json')

		const data = await fs.readFile(filePath, 'utf-8')

		const products = JSON.parse(data)

		res.json(products)
	} catch (error) {
		console.error('Error fetching data: ', error)
		res.status(500).send('Error fetching data')
	}
})

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
