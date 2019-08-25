const express = require('express')
const router = express.Router()
const TransactionController = require('../controllers/TransactionController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')


router.use(authentication)

router.get('/', TransactionController.getAll)
router.post('/', TransactionController.create)
// router.patch('/:id',authorization, CartController.update)
// router.delete('/:id', authorization, CartController.delete)

module.exports = router
