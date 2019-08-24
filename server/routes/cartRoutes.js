const express = require('express')
const router = express.Router()
const CartController = require('../controllers/CartController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')
const {sendUploadToGCS,multer} = require('../middleware/images')

router.use(authentication)

router.get('/', CartController.getAll)
router.post('/', authorization, CartController.create)
router.patch('/:id',authorization, CartController.update)
router.delete('/:id', authorization, CartController.delete)

module.exports = router
