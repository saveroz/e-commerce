const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');
const Secret=process.env.SECRET
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
const jwt = require('jsonwebtoken')
const {checkPassword} = require('../helpers/encryptPass')

class UserController{


    static create(req, res, next){
        
        const {username ,email, password} = req.body
        console.log(username)
        
        User.create({username, email, password})
        .then(user=>{
            res.status(201).json({message: "You have succesffully registered",user})
        })
        .catch(next)
    }

    static GooglesignIn(req, res, next){

        // console.log(req.body.idToken)
       
        client.verifyIdToken({
            idToken : req.body.idToken,
            audience : GOOGLE_CLIENT_ID
        })
        .then( function (ticket){
            // console.log(ticket.getPayload())
            const {email, name} = ticket.getPayload()
            
        User.findOne( {email})
        .then(user =>{
            if(!user){
                return User.create({
                    'username' : name,
                    'email' : email,
                    'password' : "tameImpala"
                })
            }
            else{
                return user
            }
        })
        .then( user=> {
            let userdata = {
                'username' : user.username,
                'id' : user._id,
                'email' : user.email
            }
            
            let token = jwt.sign(userdata,Secret)
            res.json({token})       
        })
        .catch(next)
        
    }).catch(next)

    }

    static login(req, res, next){

        const {email, password} = req.body
        // console.log(email,password)
        if(!email || !password){
            let property = !email ? "email" : "password"
            next({status : 400, message : "please input your "+property})
        }
    
        User.findOne({email})
        .then(user=>{

            if (!user){
                next({status:404, message : "You are not registered"})
            }

            else if (checkPassword(password,user.password)){
                let userdata = {
                    'username' : user.username,
                    'id' : user._id,
                    'email' : user.email,
                    'role' :user.role
                }
                let token = jwt.sign(userdata,Secret)
                res.status(200).json({token,role:user.role,username:user.username,message:"You have Successfully Login"}) 
            }
            else{
                next({status : 401, message : "invalid email/password"})
            }
        })
        .catch(err=>{
            console.log(err)
            next(err)
        })
    }
}

module.exports = UserController
