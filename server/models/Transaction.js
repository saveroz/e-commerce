const mongoose = require('mongoose')
const Cart = require('../models/Cart')
const Schema = mongoose.Schema
const Product = require('../models/Product')


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
    }
},{
    timestamps : true,
    versionKey : false
})

// transactionSchema.pre("save", function(next){

//     let UserId = this.UserId

//     Cart.find({UserId})
//     .then(allcarts=>{

//         for(let cart of allcarts){

//             Product.update()
            
//         }

//     })


// })

const Transaction = mongoose.model("Transaction", transactionSchema)

module.exports = Transaction
