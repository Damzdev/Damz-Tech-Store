import * as admin from 'firebase-admin'

const serviceAccount = require('../serviceAccountKey.json')

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://damztechstore.firebaseio.com',
})

const db = admin.firestore()
const auth = admin.auth()

export { db, auth }
