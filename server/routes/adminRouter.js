const adminControllers = require("../controllers/adminControllers")

const router = require("express").Router()

// course
router.get('/getCourses',adminControllers.getCourses)
router.post('/addCourse',adminControllers.addCourse)
router.delete('/removeCourse/:id',adminControllers.removeCourse)

// applicant
router.get('/getApplicants',adminControllers.getApplicants)
router.patch('/approveUser/:id',adminControllers.approveUser)

// calss
router.post('/addClass',adminControllers.addClass)


module.exports = router