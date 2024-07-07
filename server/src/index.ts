import express from 'express'
import cors from 'cors'
import { db } from './firebaseAdmin'

const app = express()
const port = 3005

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

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})
