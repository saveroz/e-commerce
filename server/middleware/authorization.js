const Product = require('../models/Product.js')


function authorization(req,res,next){


    
    // console.log(req.decode)
    let id = req.params.id
    console.log(req.decode.id)
    console.log(req.params.id ,"id article")
    Product.findOne({
        '_id':id,
        'UserId': req.decode.id 
    })
    .then(article=>{
        console.log(article)
        if (!article){
            console.log('masuk ke null')
            res.status(401).json(`${req.decode.username} not authorized please check carefully`)
        }
        else{
            next()
        }
        
    })
    .catch(err=>{
        console.log("masuk ke catch")
        res.status(500).json(err)
    })
}

module.exports = authorization
