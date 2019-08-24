
const Cart = require('../models/Cart')

class CartController{

    static create(req, res, next){

        let UserId = req.decode.id
        const {ProductId,amount} = req.body
        Cart.create({ProductId,amount,UserId})
        .then(product=>{
            res.status(201).json(product)
        })
        .catch(next)
    }

    static delete(req, res, next){

        const id = req.params.id
        
        Cart.findByIdAndDelete(id)
        .then(success=>{
            res.status(200).json(success)
        })
        .catch(next) 
    }

    static update(req, res, next){

        const id = req.params.id

        let updatedData = {}

        req.body.name && (updatedData.name =req.body.name)
        req.body.description && (updatedData.description =req.body.description)
        
        Cart.findByIdAndUpdate(id, updatedData, {new:true})
        .then(success=>{
            res.status(200).json(success)
        })
        .catch(next)
    }

    static getAll(req, res, next){

        Cart.find()
        .then(allCart=>{
            res.status(200).json(allCart)
        })
        .catch(next)
    }
}

module.exports = CartController



