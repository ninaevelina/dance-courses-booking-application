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

/*
const CourseSchema = new mongoose.Schema({
	namn: {
		type: String,
		required: true,
	},
	dansstil: {
		type: String,
		required: true,
	},
	start: {
		type: String,
		required: true,
	},
	slutar: {
		type: String,
		required: true,
	},
	tid: {
		type: String,
		required: true,
	},
	klasstidIMinuter: {
		type: Number,
		required: true,
	},
	pris: {
		type: Number,
		required: true,
	},
	klassLedare: {
		type: [String],
		required: true,
	},
	totalLeaders: {
		type: Number,
		default: 0,
		min: 0,
		max: 10,
	},
	totalFollowers: {
		type: Number,
		default: 0,
		min: 0,
		max: 10,
	},
	totalParticipants: {
		type: Number,
		default: 0,
		min: 0,
		max: 20,
	},
	
	participants: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Participant',
		},
	],
})
*/

const CourseSchema = new mongoose.Schema({
	namn: {
		type: String,
		required: true,
	},
	dansstil: {
		type: String,
		required: true,
	},
	start: {
		type: String,
		required: true,
	},
	slutar: {
		type: String,
		required: true,
	},
	tid: {
		type: String,
		required: true,
	},
	klasstidIMinuter: {
		type: Number,
		required: true,
	},
	pris: {
		type: Number,
		required: true,
	},
	klassLedare: {
		type: [String],
		required: true,
	},
	totalLeaders: {
		type: Number,
		default: 0,
		min: 0,
		max: 10,
	},
	totalFollowers: {
		type: Number,
		default: 0,
		min: 0,
		max: 10,
	},
	totalParticipants: {
		type: Number,
		default: 0,
		min: 0,
		max: 20,
	},

	participants: [ParticipantSchema],
})

module.exports = mongoose.model('Course', CourseSchema)
