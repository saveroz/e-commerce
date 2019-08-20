const Product = require('../models/Product')

class ProductController{

    static create(req, res, next){

        const {name, description, price, quantity, image} = req.body
        Product.create({name, description, price, quantity, image})
        .then(product=>{
            res.status(201).json(product)
        })
        .catch(next)
    }

    static delete(req, res, next){

        const id = req.params.id
        
        Product.findByIdAndDelete(id)
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
        req.body.price && (updatedData.price =req.body.price)
        req.body.quantity && (updatedData.quantity =req.body.quantity)
        req.body.image && (updatedData.image =req.body.image)
        

        Product.findByIdAndUpdate(id, updatedData, {new:true})
        .then(success=>{
            res.status(200).json(success)
        })
        .catch(next)
    }

    static getAll(req, res, next){

        Product.find()
        .then(allProduct=>{
            res.status(200).json(allProduct)
        })
        .catch(next)
    }
}

module.exports = ProductController



