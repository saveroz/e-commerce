const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema ({
    name : {
        type : String,
        required : [true, "type is required"]
    },
    description : {
        type : String,
        required : [true,"description is required"]
    },
    stock : {
        type : Number,
        required : [true, "stock is required"],
        min : [1, "you cannot add product with stock below 1"],
        validate : {
            validator : Number.isInteger,
            message : "please input integer only"
        }
    },
    image : {
        type : String,
        required : [true, "image is required"]
    },
    price : {
        type : Number,
        required : [true,"price is required"],
        min : [1, "you cannot add product with this price"],
        validate : {
            validator : Number.isInteger,
            message : "please input integer only"
        }
    }
},{
    timestamps : true,
    versionKey : false
})





const Product = mongoose.model("Product", productSchema)

module.exports = Product
