
const Cart = require('../models/Cart')

class CartController{

    static create(req, res, next){

        console.log(req.body)
        let UserId = req.decode.id
        const {ProductId,amount} = req.body
        let status = false
        Cart.findOne({ProductId,status})
        .then(cart=>{
            // console.log(cart,"masuk ke cart create")

            if (cart){
                console.log("masuk ke false", cart.status)
                let totalAmount = Number(cart.amount)+ Number(amount)
                return cart.updateOne({amount:totalAmount},{new:true})
            }
            else{
                console.log("masuk ke true")
                return Cart.create({ProductId,amount,UserId})

            }
        })
        .then(response=>{
            res.status(201).json(response)
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

        req.body.ProductId && (updatedData.ProductId =req.body.ProductId)
        req.body.amount && (updatedData.amount =req.body.amount)
        
        Cart.findByIdAndUpdate(id, updatedData, {new:true})
        .then(success=>{
            res.status(200).json(success)
        })
        .catch(next)
    }

    static getAll(req, res, next){
        
        let UserId = req.decode.id
        Cart.find({
            UserId
        }).populate("ProductId")
        .then(allCart=>{
            res.status(200).json(allCart)
        })
        .catch(next)
    }
}

module.exports = CartController



