const express = require('express')
const router = express.Router()
const TransactionController = require('../controllers/TransactionController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')
const adminAuthorization = require("../middleware/adminAuthorization")


router.use(authentication)


router.get('/', adminAuthorization, TransactionController.getAll)
router.get('/user', TransactionController.getUser)
router.post('/', TransactionController.create)
router.patch("/:id", adminAuthorization, TransactionController.update)
router.delete("/:id", adminAuthorization, TransactionController.delete)
// router.patch('/:id',authorization, CartController.update)
// router.delete('/:id', authorization, CartController.delete)

module.exports = router
