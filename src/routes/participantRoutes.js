const express = require('express')
const router = express.Router()

const { getAllParticipants, getParticipantById, updateParticipantDetails } = require('../controllers/participantController')

// GET req - /api/v1/participants/

router.get('/', getAllParticipants)

// GET req - /api/v1/participants/:participantId

router.get('/:participantId', getParticipantById)

// PUT req - /api/v1/participants/:participantId

router.put('/:participantId', updateParticipantDetails)

module.exports = router
