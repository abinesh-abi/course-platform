const userControllers = require("../controllers/userControllers")

const router = require("express").Router()

router.post('/register',userControllers.registerUser)
router.post('/login',userControllers.login)
router.post('/logout',userControllers.logout)
router.post('/refresh_token',userControllers.generateAcceTocken)

router.get('/get_course_list',userControllers.getCoursesList)

router.post('/bookClass/:id',userControllers.bookClass)

module.exports = router