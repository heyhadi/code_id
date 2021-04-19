const router = require('express').Router()
const UserController = require("../controllers/userController")
const {authentication} = require('../middlewares/authUser')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
// router.use(authentication)
router.get('/:id', UserController.getById)
router.put('/:id', UserController.update)
router.delete('/:id', UserController.delete)




module.exports = router