const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema ({
    UserId : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    ProductId : {
        type : Schema.Types.ObjectId,
        ref : "Product",
        required : true
    },
    amount :  {
        type : Number,
        min : [1, "Please input valid amount"],
        required : true
    },
    status : {
        type : Boolean,
    },
},{
    timestamps : true,
    versionKey : false
})

cartSchema.pre('save', function(next){
    this.status = false
    next()
})

const Cart = mongoose.model("Cart", cartSchema)

module.exports = Cart
