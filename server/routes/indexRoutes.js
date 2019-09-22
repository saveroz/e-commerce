const express = require('express')
const router = express.Router()
const userRoutes = require('./userRoutes')
const productRoutes = require('./productRoutes')
const cartRoutes = require('./cartRoutes')
const transactionRoutes = require('./transactionRoutes')
const reviewRoutes = require("./reviewRoutes")

router.get('/', function(req,res,next){
    res.send("masuk ke index routes")
})

router.use('/users',userRoutes)
router.use('/carts', cartRoutes)
router.use('/products',productRoutes )
router.use('/transactions', transactionRoutes)
router.use('/reviews', reviewRoutes)

module.exports = router









module.exports = router
