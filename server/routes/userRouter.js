const userControllers = require("../controllers/userControllers")

const router = require("express").Router()

router.get('/',userControllers.addUser)
router.post('/login',userControllers.login)
router.post('/refresh_token',userControllers.generateAcceTocken)

module.exports = router