const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema ({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    stock : {
        type : Number,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    }
},{
    timestamps : true,
    versionKey : false
})



const Product = mongoose.model("Product", productSchema)

module.exports = Product
