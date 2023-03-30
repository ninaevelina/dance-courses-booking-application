const Course = require('../models/Course')
const Participant = require('../models/Participant')
const { NotFoundError, BadRequestError } = require('../utils/errors')

exports.getAllCourses = async (req, res, next) => {
	const courses = await Course.find()
	const totalCoursesInDatabase = await Course.countDocuments()

	return res.json({
		data: courses,
		meta: {
			total: totalCoursesInDatabase,
			count: courses.length,
		},
	})
}

exports.getCourseById = async (req, res, next) => {
	const courseId = req.params.courseId

	const course = await Course.findById(courseId)

	if (!course) throw new NotFoundError('There is no such course')
	return res.status(200).json(course)
}

exports.addParticipantToCourse = async (req, res) => {
	const courseId = req.params.courseId

	const { name, email, phone, role, paymentpending } = req.body

	const course = await Course.findById(courseId)
	if (!course) throw new NotFoundError('There is no such course')

	const participantsinCourse = course.participants

	let totalParticipants = course.totalParticipants
	let totalFollowers = course.totalFollowers
	let totalLeaders = course.totalLeaders

	const newParticipant = {
		name: name,
		email: email,
		phone: phone,
		role: role,
		paymentpending: paymentpending,
	}

	if (participantsinCourse.length < 20 && totalParticipants < 20) {
		participantsinCourse.push(newParticipant)
		course.totalParticipants += 1
	} else {
		throw new BadRequestError('All slots are already taken.')
	}

	if (newParticipant.role == 'FOLLOWER') {
		if (totalFollowers < 10) {
			course.totalFollowers++
		} else {
			throw new BadRequestError('All follower-slots are already taken.')
		}
	}

	if (newParticipant.role == 'LEADER') {
		if (totalLeaders < 10) {
			course.totalLeaders++
		} else {
			throw new BadRequestError('All leader-slots are already taken.')
		}
	}

	const updatedCourse = await course.save()

	let courseStart = course.start
	parseInt(courseStart)

	let courseStartDate = new Date(courseStart)

	console.log(courseStartDate)
	parseInt(courseStart)

	let inactiveDateRange = new Date('2023-08-02')
	if (inactiveDateRange < courseStartDate) {
		throw new BadRequestError('Can not add to inactive course')
	}

	return res.json(updatedCourse)
}

exports.removeParticipantFromCourse = async (req, res) => {
	const courseId = req.params.courseId
	console.log(courseId)
	const participantId = req.params.participantId
	console.log(participantId)

	const course = await Course.findById(courseId)
	console.log(course)
	if (!course) throw new NotFoundError('There is no such course')

	const participantsinCourse = course.participants
	const followersInCourse = course.totalFollowers
	const leadersInCourse = course.totalLeaders
	console.log('particpantsincourse:' + participantsinCourse)
	console.log(typeof participantsinCourse)

	const index = participantsinCourse.findIndex((participant) => participant._id == participantId)

	if (participantsinCourse[index].role == 'FOLLOWER') {
		if (followersInCourse > 0) {
			course.totalFollowers--
		} else {
			throw new BadRequestError('Bad Request')
		}
	}

	if (participantsinCourse[index].role == 'LEADER') {
		if (leadersInCourse > 0) {
			course.totalLeaders--
		} else {
			throw new BadRequestError('Bad Request')
		}
	}

	console.log(index)

	if (index < 0) {
		console.log('First if')
		throw new NotFoundError('There is no such participant')
	} else {
		participantsinCourse.splice(index, 1)
		course.totalParticipants -= 1
		const updatedCourse = await course.save()

		console.log('else')

		return res.json(updatedCourse)
	}
}
