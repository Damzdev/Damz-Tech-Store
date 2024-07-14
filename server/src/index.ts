import express from 'express'
import cors from 'cors'
import { db } from './firebaseAdmin'

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

app.use(
	cors({
		origin: 'http://localhost:5174',
		methods: ['GET', 'POST'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
)

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

app.get('/api/components/intel-motherboards', async (req, res) => {
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
})

app.get('/api/components/amd-motherboards', async (req, res) => {
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
})

app.get('/api/components/gaming-mouses', async (req, res) => {
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

app.get('/api/components/power-supplys', async (req, res) => {
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
})

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

app.get('/api/components/operating-system', async (req, res) => {
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
})

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

app.get('/api/dell-gaming-laptops', async (req, res) => {
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
})

app.get('/api/acer-gaming-laptops', async (req, res) => {
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
})

app.get('/api/asus-gaming-laptops', async (req, res) => {
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
})

app.get('/api/hp-gaming-laptops', async (req, res) => {
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
})

app.get('/api/lenovo-gaming-laptops', async (req, res) => {
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
})

app.get('/api/msi-gaming-laptops', async (req, res) => {
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
})

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
		const allDocs = await Promise.all(
			collections.map(async (collection) => {
				const querySnapshot = await db.collection(collection).get()
				return querySnapshot.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
					collection,
				}))
			})
		)
		const mergedDocs = allDocs.flat()
		res.json(mergedDocs)
	} catch (error) {
		console.error('Error fetching data: ', error)
		res.status(500).send('Error fetching data')
	}
})

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
