const Participant = require('../models/Participant')
const { NotFoundError, BadRequestError } = require('../utils/errors')

exports.getAllParticipants = async (req, res, next) => {
	const limit = Number(req.query?.limit || 20)
	const offset = Number(req.query?.offset || 0)
	const participants = await Participant.find().limit(limit).skip(offset)
	const totalParticipantsInDatabase = await Participant.countDocuments()

	return res.json({
		data: participants,
		meta: {
			total: totalParticipantsInDatabase,
			limit: limit,
			offset: offset,
			count: participants.length,
		},
	})
}

exports.getParticipantById = async (req, res, next) => {
	const participantId = req.params.participantId

	const participant = await Participant.findById(participantId)

	if (!participant) throw new NotFoundError('There is no such participant')
	return res.status(200).json(participant)
}

exports.updateParticipantDetails = async (req, res) => {
	const participantId = req.params.participantId
	const { email, phone, paymentpending } = req.body

	const participant = await Participant.findById(participantId)

	if (!participant) throw new NotFoundError('There is no such participant')

	if (!email || !phone || !paymentpending) {
		throw new BadRequestError('You have to fill in all fields to update your contact details')
	}

	if (email) {
		participant.email = email
	}

	if (phone) {
		participant.phone = phone
	}

	if (paymentpending) {
		participant.paymentpending = paymentpending
	}

	const updatedParticipant = await participant.save()
	return res.json(updatedParticipant)
}
