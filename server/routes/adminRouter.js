const adminControllers = require("../controllers/adminControllers")

const router = require("express").Router()

router.get('/getCourses',adminControllers.getCourses)
router.post('/addCourse',adminControllers.addCourse)
router.delete('/removeCourse/:id',adminControllers.removeCourse)


module.exports = router