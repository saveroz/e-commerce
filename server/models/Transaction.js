const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema ({
    UserId : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    cartId : {
        type : Schema.Types.ObjectId,
        ref : "Cart",
        required : true
    },
    TotalPrice: {
        type : true,
        required: true
    }
},{
    timestamps : true,
    versionKey : false
})


const Transaction = mongoose.model("Transaction", transactionSchema)

module.exports = Transaction
