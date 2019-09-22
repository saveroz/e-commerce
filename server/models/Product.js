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
