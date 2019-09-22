const mongoose = require("mongoose")
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    UserId : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    content : {
        type : String,
        required : true
    },
    ProductId : {
        type : String,
        ref : "Product",
        required : true
    },
    rating : {
        type : Number,
        min : [0, "you cannot give a rating below 0"],
        max : [5, "you cannot give a rating above 5"]
    },
},{
    timestamps : true,
    versionKey : false
})

const Review = mongoose.model("Review", reviewSchema)

module.exports = Review
