const express = require('express')
const router = express.Router()
const CartController = require('../controllers/CartController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')


router.use(authentication)

router.get('/', CartController.getAll)
router.post('/', CartController.create)
router.patch('/:id',authorization, CartController.update)
router.delete('/:id', authorization, CartController.delete)

module.exports = router
