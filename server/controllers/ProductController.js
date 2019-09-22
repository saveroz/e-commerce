const Product = require('../models/Product')

class ProductController{

    static create(req, res, next){

        console.log('masuk ke product create')
        // console.log(req.body.image)
        console.log(typeof req.body.price)
        let image=null
        if (req.file){
            image = req.file.cloudStoragePublicUrl 
        }
        const {name, description, price, stock} = req.body
        Product.create({name, description, price, stock, image})
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

        if (req.file){
            req.file.cloudStoragePublicUrl && (updatedData.image=req.file.cloudStoragePublicUrl)
        }

        let updatedData = {}

        req.body.name && (updatedData.name =req.body.name)
        req.body.description && (updatedData.description =req.body.description)
        req.body.price && (updatedData.price =req.body.price)
        req.body.stock && (updatedData.stock =req.body.stock)
        
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

    static getOne(req, res, next){
        let id = req.params.id

        Product.findById(id)
        .then(product=>{
            res.status(200).json(product)
        })
        .catch(next)


    }
}

module.exports = ProductController



