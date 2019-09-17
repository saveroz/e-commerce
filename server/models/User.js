const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { generatePass } = require('../helpers/encryptPass')

const UserSchema = new Schema({
    username : {
        type : String,
        required : [true, "username is required"]
    },
    email : {
        type :String,
        required : [true,"email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        validate : {
            validator : function(){
                return new Promise((resolve,reject)=>{
                    User.findOne({
                        email : this.email
                    })
                    .then(email=>{
                        if (email){
                            resolve(false)
                        }
                        else{
                            resolve(true)
                        }
                    })
                    .catch(err =>{
                        resolve(false)
                    })
                })
            }, message : "this email has been registered"
        }
    },
    password : {
        type : String,
        required : [true, "password is required"]
    },
    role : {
        type : String
    }
},{
    timestamps : true,
    versionKey :false
})

UserSchema.pre('save', function(next){
    let password = generatePass (this.password)
    this.password = password
    next()
})

UserSchema.pre('save', function(next){
    if (!this.role){
        this.role = "customer"
    }
    next()
})
const User = mongoose.model("User", UserSchema)

module.exports = User

