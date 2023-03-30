require('dotenv').config()
require('express-async-errors')
const express = require('express')

const { default: mongoose } = require('mongoose')
const participantRoutes = require('./routes/participantRoutes')
const courseRoutes = require('./routes/courseRoutes')
const { notFoundMiddleware } = require('./middleware/notFoundMiddleware')
const { errorMiddleware } = require('./middleware/errorMiddleware')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
	console.log(`Processing ${req.method} request to ${req.path}`)
	next()
})
// Routes

app.use('/api/v1/courses', courseRoutes)
app.use('/api/v1/participants', participantRoutes)

// Middleware error handling

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 5000
const run = async () => {
	try {
		mongoose.set('strictQuery', false)
		const conn = await mongoose.connect(process.env.MONGO_CONNECTION_STRING)
		console.log(`MongoDB connected: ${conn.connection.host}`)

		app.listen(port, () => {
			console.log(`Server is listening on http://localhost:${port}`)
		})
	} catch (error) {
		console.error(error)
	}
}

run()
