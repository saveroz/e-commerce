const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema ({
    UserId : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    ProductId : {
        type : Schema.Types.ObjectId,
        ref : "Product"
    },
    amount :  {
        type : Number,
        required : true
    },
},{
    timestamps : true,
    versionKey : false
})


const Cart = mongoose.model("Cart", cartSchema)

module.exports = Cart
