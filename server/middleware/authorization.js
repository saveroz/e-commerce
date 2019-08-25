const Cart = require('../models/Cart')


function authorization(req,res,next){
    
    console.log("masuk ke authorization")
    let id = req.params.id
    // console.log(req.decode.id)
    console.log(req.params.id )
    Cart.findOne({
        '_id':id,
        'UserId': req.decode.id 
    })
    .then(cart=>{
        console.log(cart)
        if (!cart){
            console.log('masuk ke null')
            res.status(401).json({message : `You are not authorized please check carefully`})
        }
        else{
            next()
        }
        
    })
    .catch(err=>{
        console.log("masuk ke catch")
        res.status(401).json({message : `You are not authorized please check carefully`})
    })
}

module.exports = authorization
