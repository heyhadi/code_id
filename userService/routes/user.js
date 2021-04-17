const router = require('express').Router()
const UserController = require("../controllers/userController")

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/profile/:accNo', UserController.getByAccNumber)
router.get('/profile/:idNo', UserController.getByIdNumber)



module.exports = router