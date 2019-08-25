const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')
const adminAuthorization = require('../middleware/adminAuthorization')
const {sendUploadToGCS,multer} = require('../middleware/images')



router.get('/', ProductController.getAll)
router.get('/:id',ProductController.getOne )
router.use(authentication)
router.post('/', adminAuthorization,multer.single('image'),sendUploadToGCS,ProductController.create)
router.patch('/:id',adminAuthorization,multer.single('image'),sendUploadToGCS, ProductController.update)
router.delete('/:id', adminAuthorization, ProductController.delete)


module.exports = router
