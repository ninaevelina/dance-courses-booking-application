const mongoose = require('mongoose')

const ParticipantSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ['LEADER', 'FOLLOWER'],
		required: true,
	},
	paymentpending: {
		type: Boolean,
		default: true,
		required: true,
	},
})

module.exports = mongoose.model('Participant', ParticipantSchema)
