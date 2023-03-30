require('dotenv').config()
const mongoose = require('mongoose')
// @ts-ignore
const springTerm2023MockData = require('./mockdata/springTerm2023.json')
// @ts-ignore
const fallTermMock2023Data = require('./mockdata/fallTerm2023.json')
// @ts-ignore
const participantData = require('./mockdata/participants.json')

const Course = require('../src/models/Course')
const Participant = require('../src/models/Participant')

const populateDbWithMockData = async (connectionString) => {
	let conn
	try {
		mongoose.set('strictQuery', false)
		conn = await mongoose.connect(connectionString)
		console.log(`MongoDB connected: ${conn.connection.host}`)

		// POPULATE DATA ACCOORDING TO YOUR MODELS
		await Course.deleteMany()
		await Participant.deleteMany()

		await Course.create(springTerm2023MockData)
		await Course.create(fallTermMock2023Data)
		await Participant.create(participantData)

		console.log(springTerm2023MockData)
		console.log(fallTermMock2023Data)

		console.log('Database successfully populated with test data')
	} catch (error) {
		console.error(error)
	} finally {
		process.exit(0)
	}
}

populateDbWithMockData(process.env.MONGO_CONNECTION_STRING)
