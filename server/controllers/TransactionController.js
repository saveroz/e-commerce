const Transaction = require('../models/Transaction')
const Cart = require('../models/Cart')
const Product = require('../models/Product')

class TransactionController {

    static create(req, res, next) {

        console.log('masuk ke transaction create')
        let UserId = req.decode.id
        const { CartId, totalPrice } = req.body

        Cart.find({ UserId, status: false }).populate("ProductId")
            .then(allcarts => {
                let updatedCart = []
                for (let cart of allcarts) {
                    cart.update({ status: true })
                    let numberOfBoughtProducts = cart.amount
                    let productStock = cart.ProductId.stock
                    let remainingStock = productStock - numberOfBoughtProducts
                    if (remainingStock < 0) {
                        console.log("masuk ke error remaining stock")
                        throw new Error(`${cart.ProductId.name} stock is not enough`)
                    }
                    else {
                        let updatedData = { stock: remainingStock }
                        let productId = cart.ProductId
                        // throw new Error ('email/password not found')
                        updatedCart.push(cart.updateOne({ status: true }), Product.findByIdAndUpdate(productId, updatedData, { new: true }))
                    }
                    // console.log(remainingStock, "remainingStock")

                }
                // console.log(allcarts, "djasasduansuduasnundau")

                return Promise.all(updatedCart)
            })
            .then(response => {
                return Transaction.create({ UserId, CartId, totalPrice })
                // console.log(response)
            })
            .then(transaction => {
                res.status(201).json(transaction)
            })
            .catch(next)

    }

    static delete(req, res, next) {

        const id = req.params.id

        Transaction.findByIdAndDelete(id)
            .then(success => {
                res.status(200).json(success)
            })
            .catch(next)
    }

    static update(req, res, next) {

        const id = req.params.id

        let updatedData = {}
        console.log(req.body.status)
        req.body.status && (updatedData.status = req.body.status)
        

        Transaction.findByIdAndUpdate(id, updatedData, { new: true })
            .then(success => {
                res.status(200).json(success)
            })
            .catch(next)
    }

    static getUser(req, res, next) {
        let UserId = req.decode.id
        Transaction.find({ UserId }).populate({
            path : "CartId",
            populate : {
                path : "ProductId",
                select : "name price"
            }
        })
            .then(allTransaction => {
                res.status(200).json(allTransaction)
            })
            .catch(next)
    }

    static getOne(req, res, next) {
        let id = req.params.id

        Transaction.findById(id)
            .then(product => {
                res.status(200).json(product)
            })
            .catch(next)

    }
    static getAll(req,res,next){
        
        Transaction.find().populate([{
            path : "CartId",
            populate : {
                path : "ProductId",
                select : "name price"
            }
        }, {path : "UserId", select:"username"}])
            .then(allTransaction => {
                res.status(200).json(allTransaction)
            })
            .catch(next)
    }
}

module.exports = TransactionController



