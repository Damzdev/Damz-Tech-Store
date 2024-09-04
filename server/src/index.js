const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { db } = require('./firebaseAdmin')
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const { log } = require('console')
require('dotenv').config()

const app = express()
const port = 3005

app.use(
	cors({
		origin: function (origin, callback) {
			const allowedOrigins = [
				'http://localhost:5174',
				'https://damz-tech-store.vercel.app',
				'https://damz-tech-store.vercel.app/checkout',
			]
			if (!origin || allowedOrigins.indexOf(origin) !== -1) {
				callback(null, true)
			} else {
				callback(new Error('Not allowed by CORS'))
			}
		},
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
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

// Get cart all products then send .where from client matching product ids with all products
app.post('/api/cartItems', async (req, res) => {
	try {
		const { cartItems } = req.body // Array of product IDs

		let query = db.collection('products').where('__name__', 'in', cartItems)
		const querySnapshot = await query.get()
		const docs = querySnapshot.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}))
		res.json(docs)
	} catch (error) {
		console.error('Error retrieving cart items:', error)
		res.status(500).send('Error retrieving cart items')
	}
})

// Get cart
app.get('/api/cart', authenticateToken, async (req, res) => {
	try {
		const cartRef = db.collection('carts').doc(req.user.id)
		const doc = await cartRef.get()
		if (!doc.exists) {
			res.status(200).json({ items: [] })
		} else {
			res.status(200).json(doc.data())
		}
	} catch (error) {
		console.error('Error retrieving cart: ', error)
		res.status(500).send('Error retrieving cart')
	}
})

// Update cart (replaces the entire cart)
app.put('/api/cart', authenticateToken, async (req, res) => {
	const { items } = req.body
	try {
		const cartRef = db.collection('carts').doc(req.user.id)
		await cartRef.set({ items })
		res.status(200).json({ items })
	} catch (error) {
		console.error('Error updating cart: ', error)
		res.status(500).send('Error updating cart')
	}
})

// Add or update item in cart
app.post('/api/cart/item', authenticateToken, async (req, res) => {
	const { id, quantity } = req.body
	try {
		const cartRef = db.collection('carts').doc(req.user.id)
		const doc = await cartRef.get()
		let items = doc.exists ? doc.data().items || [] : []

		const existingItemIndex = items.findIndex((item) => item.id === id)
		if (existingItemIndex > -1) {
			items[existingItemIndex].quantity = quantity
		} else {
			items.push({ id, quantity })
		}

		await cartRef.set({ items }, { merge: true })
		res.status(200).json({ items })
	} catch (error) {
		console.error('Error updating cart item: ', error)
		res.status(500).send('Error updating cart item')
	}
})

// Remove item from cart
app.delete('/api/cart/item/:itemId', authenticateToken, async (req, res) => {
	const { itemId } = req.params
	try {
		const cartRef = db.collection('carts').doc(req.user.id)
		const doc = await cartRef.get()
		if (doc.exists) {
			let items = doc.data().items || []
			items = items.filter((item) => item.id !== itemId)
			await cartRef.set({ items }, { merge: true })
		}
		res.status(200).send('Item removed from cart')
	} catch (error) {
		console.error('Error removing item from cart: ', error)
		res.status(500).send('Error removing item from cart')
	}
})

// Clear cart
app.delete('/api/cart', authenticateToken, async (req, res) => {
	try {
		const cartRef = db.collection('carts').doc(req.user.id)
		await cartRef.set({ items: [] })
		res.status(200).send('Cart cleared successfully')
	} catch (error) {
		console.error('Error clearing cart: ', error)
		res.status(500).send('Error clearing cart')
	}
})

// Your existing routes

app.get('/api/gaming-pcs/amd', async (req, res) => {
	try {
		const querySnapshot = await db
			.collection('products')
			.where('category', '==', 'AMD-Gaming-Pcs')
			.get()
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

app.get('/api/gaming-pcs/intel', async (req, res) => {
	try {
		const querySnapshot = await db
			.collection('products')
			.where('category', '==', 'Intel-Gaming-Pcs')
			.get()
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
		const querySnapshot = await db
			.collection('products')
			.where('category', '==', 'intel-processors')
			.get()
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
		const querySnapshot = await db
			.collection('products')
			.where('category', '==', 'amd-processors')
			.get()
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
		const querySnapshot = await db
			.collection('products')
			.where('category', '==', 'cpu-coolers')
			.get()
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
		const querySnapshot = await db
			.collection('products')
			.where('category', '==', 'nvidia-GPU')
			.get()
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
		const querySnapshot = await db
			.collection('products')
			.where('category', '==', 'radeon-GPU')
			.get()
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
		const querySnapshot = await db
			.collection('products')
			.where('category', '==', 'hard-drives')
			.get()
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
		const querySnapshot = await db
			.collection('products')
			.where('category', '==', 'keyboards')
			.get()
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
		const querySnapshot = await db
			.collection('products')
			.where('category', '==', 'ram-memory')
			.get()
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
			const querySnapshot = await db
				.collection('products')
				.where('category', '==', 'intel-motherboards')
				.get()
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

app.get('/api/components/amd-motherboards', async (req, res) => {
	try {
		const querySnapshot = await db
			.collection('products')
			.where('category', '==', 'amd-motherboards')
			.get()

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

app.get('/api/components/mouses', async (req, res) => {
	try {
		const querySnapshot = await db
			.collection('products')
			.where('category', '==', 'mouses')
			.get()
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
			const querySnapshot = await db
				.collection('products')
				.where('category', '==', 'power-supplys')
				.get()
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
		const querySnapshot = await db
			.collection('products')
			.where('category', '==', 'pc-cases')
			.get()
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
			const querySnapshot = await db
				.collection('products')
				.where('category', '==', 'operating-system')
				.get()
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
		const querySnapshot = await db
			.collection('products')
			.where('category', '==', 'SSD')
			.get()
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
			const querySnapshot = await db
				.collection('products')
				.where('category', '==', 'dell-gaming-laptops')
				.get()
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
			const querySnapshot = await db
				.collection('products')
				.where('category', '==', 'acer-gaming-laptops')
				.get()
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
			const querySnapshot = await db
				.collection('products')
				.where('category', '==', 'asus-gaming-laptops')
				.get()
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
			const querySnapshot = await db
				.collection('products')
				.where('category', '==', 'hp-gaming-laptops')
				.get()
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
			const querySnapshot = await db
				.collection('products')
				.where('category', '==', 'lenovo-gaming-laptops')
				.get()
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
			const querySnapshot = await db
				.collection('products')
				.where('category', '==', 'msi-gaming-laptops')
				.get()
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
		const querySnapshot = await db
			.collection('products')
			.where('category', '==', 'monitors')
			.get()
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
		const querySnapshot = await db
			.collection('products')
			.where('category', '==', 'gaming-chairs')
			.get()
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

app.get('/api/component-deals', async (req, res) => {
	try {
		const categorys = [
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
			'SSD',
		]

		const allData = []

		for (const category of categorys) {
			const querySnapshot = await db
				.collection('products')
				.where('category', '==', category)
				.get()
			const docs = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
				Category: category, // Optional: include the collection name
			}))
			allData.push(...docs)
		}

		res.json(allData)
	} catch (error) {
		console.error('Error fetching data: ', error)
		res.status(500).send('Error fetching data')
	}
})

app.listen(port, () => {
	console.log(`Damztech api listening on port ${port}`)
})

module.exports = app
