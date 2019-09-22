const Review = require('../models/Review')
const Transaction = require('../models/Transaction')

class ReviewController {


    static create(req, res, next) {

        console.log("masuk ke create")
        let UserId = req.decode.id
        let { ProductId, content, rating } = req.body

        Review.find({ UserId, ProductId })
            .then(review => {
                if (review.length === 0) {
                    console.log("mask sebelum review")
                    return Review.create({ UserId, ProductId, content, rating })
                }
                else {
                    // console.log(review)
                    console.log("masuk ke alredy review")
                    res.status(400).json({message : "you already give a review"})
                    // ({ status: 400, message: "You already give a review" })
                }
            })
            .then(result => {
                if (result){
                    console.log("masuk ke result")
                    console.log(result)
                    res.status(201).json(result)
                }
            })
            .catch(next)
    }

    static update(req, res, next) {

        let id = req.params.id

        let updatedData = {}
        req.body.content && (updatedData.content = req.body.content)
        req.body.rating && (updatedData.rating = req.body.rating)

        Review.findByIdAndUpdate(id, updatedData, { new: true })
            .then(updatedReview => {
                res.status(200).json(updatedReview)
            })
            .catch(next)

    }

    static getAll(req, res, next) {
        // console.log("masuk ke get all")
        Review.find()
            .then(reviews => {
                res.status(200).json(reviews)
            })
            .catch(next)
    }

    static getByProduct(req, res, next) {

        let ProductId = req.params.id

        Review.find({ ProductId }).populate({path :"UserId", select: "username"})
            .then(reviews => {
                res.status(200).json(reviews)
            })
            .catch(next)
    }
    static validateBuy(req, res, next) {

        let UserId = req.decode.id
        let { ProductId, content, rating } = req.body

        Transaction.find({ UserId }).populate({
            path: "CartId"
        })
            .then(transactions => {

                if (transactions.length === 0) {
                    next({ status: 404, message: "You dont have any transactions" })
                }
                else {
                    let cond = false
                    for (let transaction of transactions) {

                        for (let cart of transaction.CartId) {

                            if (cart.ProductId == ProductId) {
                                console.log("==============")
                                console.log(cart.ProductId)
                                console.log(ProductId)
                                cond = true
                                next()
                            }
                        }
                    }
                    if (!cond) {
                        // console.log("You cannot give review")
                        next({ status: 400, message: "You cannot give a review because you havent buy" })
                    }
                }
            })
            .catch(next)
    }
}

module.exports = ReviewController
