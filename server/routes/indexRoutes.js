const express = require('express')
const router = express.Router()
const userRoutes = require('./userRoutes')
const productRoutes = require('./productRoutes')

router.get('/', function(req,res,next){
    res.send("masuk ke index routes")
})

router.use('/users',userRoutes)
router.use('/products',productRoutes )

module.exports = router









module.exports = router