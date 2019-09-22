const mongoose = require('mongoose')
const Schema = mongoose.Schema



const transactionSchema = new Schema ({
    UserId : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    CartId : [{
        type : Schema.Types.ObjectId,
        ref : "Cart",
        required : true
    }],
    totalPrice: {
        type : Number,
        required: true
    },
    status : {
        type : String
    }
},{
    timestamps : true,
    versionKey : false
})
transactionSchema.pre("save", function(next){
    if(!this.status){
        this.status = "pending"
    }
    next()
})


const Transaction = mongoose.model("Transaction", transactionSchema)

module.exports = Transaction
