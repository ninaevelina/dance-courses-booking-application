const express = require('express')
const router = express.Router()

const {
	getAllCourses,
	getCourseById,
	addParticipantToCourse,
	removeParticipantFromCourse,
} = require('../controllers/courseController')

router.get('/', getAllCourses)

router.get('/:courseId', getCourseById)

router.put('/:courseId', addParticipantToCourse)

router.put('/:courseId/participants/:participantId', removeParticipantFromCourse)

module.exports = router
