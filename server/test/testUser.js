const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const User = require('../models/User')

chai.use(chaiHttp)

before(function(done){
    User.deleteMany()
    .then(response=>{
        console.log(response)
        console.log("database has been cleared")
        done()
    })
})

describe('POST/users/register', function(){

    it ('You have successfully registered account', function(done){
        
        let user = {
            username : "saveroz",
            email :"saveromuhammad@yahoo.com",
            password : "253062"
        }
        
        chai.
        request(app)
        .post('/users/register')
        .send(user)
        .end (function(err,res){
            // console.log(err)
            // console.log(res.body)
            // expect(res).to.be.an('object')
            expect(res).to.have.status(201)
            expect(res.body.user).to.have.property('email')
            expect(res.body.user).to.have.property('username')
            expect(res.body.user).to.have.property('password')
            expect(res.body.user.username).to.equal(user.username)
            expect(res.body.user.email).to.equal(user.email)
            expect(res.body.user.password).to.not.equal(user.password)
            done()
        })

    } )
    it ('You have failed to registered account because email is already registered', function(done){
        
        let user = {
            username : "saveroz",
            email :"saveromuhammad@yahoo.com",
            password : "253062"
        }
        
        chai.
        request(app)
        .post('/users/register')
        .send(user)
        .end (function(err,res){
            // console.log(res.body)
            expect(res).to.have.status(400)
            expect(res.body).to.have.property("message")
            // expect(res.body.message).to.equal("validation error")
            expect(res.body.message).to.include("this email has been registered")
            // expect(res.body.user.username).to.equal(user.username)
            // expect(res.body.user.email).to.equal(user.email)
            done()
        })

    })
    it ('You have failed to registered account because data incomplete', function(done){
        
        let user = {
            // email :"saveromuhammad@yahoo.com",
        }
        
        chai.
        request(app)
        .post('/users/register')
        .send(user)
        .end (function(err,res){
            // console.log(res.body)
            expect(res).to.have.status(400)
            expect(res.body).to.be.an("object")
            expect(res.body).to.have.property("message")
            // expect(res.body.message).to.equal("validation error")
            expect(res.body.message).to.include("password is required")
            expect(res.body.message).to.include("email is required")
            expect(res.body.message).to.include("username is required")
            // expect(res.body.user.username).to.equal(user.username)
            // expect(res.body.user.email).to.equal(user.email)
            done()
        })

    })



})



describe('POST/users/login', function(){

    it ('You have successfully login', function(done){
        
        let user = {
            email :"saveromuhammad@yahoo.com",
            password: "253062"
        }
        
        chai.
        request(app)
        .post('/users/login')
        .send(user)
        .end (function(err,res){
            // console.log(res.body)
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('token')
            expect(res.body.token).to.be.a("string")
            // expect(res.body.user.username).to.equal(user.username)
            // expect(res.body.user.email).to.equal(user.email)
            // expect(res.body.user.password).not.equal(user.password)
            done()
        })

    } )
    it ('You have failed to login because password is wrong', function(done){
        
        let user = {
            email :"saveromuhammad@yahoo.com",
            password:"253998062"
        }
        
        chai.
        request(app)
        .post('/users/login')
        .send(user)
        .end (function(err,res){
            console.log(res.body)
            expect(res).to.have.status(401)
            expect(res.body).to.have.property("message")
            expect(res.body.message).to.equal("invalid email/password")
            // expect(res.body).to.have.property('token')
            // expect(res.body.user.username).to.equal(user.username)
            // expect(res.body.user.email).to.equal(user.email)
            done()
        })

    })
    it ('You have failed to login because you are not registered', function(done){
        
        let user = {
            email :"sav@yahoo.com",
            password:"253998062"
        }
        
        chai.
        request(app)
        .post('/users/login')
        .send(user)
        .end (function(err,res){
            console.log(res.body)
            // console.log(err)
            expect(res).to.have.status(404)
            expect(res.body).to.have.property("message")
            expect(res.body.message).to.equal("You are not registered")
            // expect(res.body).to.have.property('token')
            // expect(res.body.user.username).to.equal(user.username)
            // expect(res.body.user.email).to.equal(user.email)
            done()
        })
    })
    it ('You have failed to login because no password', function(done){
        
        let user = {
            email :"sav@yahoo.com",

        }
        
        chai.
        request(app)
        .post('/users/login')
        .send(user)
        .end (function(err,res){
            console.log(res.body)
            expect(res).to.have.status(400)
            expect(res.body).to.have.property("message")
            expect(res.body.message).to.equal("please input your password")
            done()
        })
    })

    it ('You have failed to login because no password', function(done){
        
        let user = {
            password : "ggwp"
        }
        
        chai.
        request(app)
        .post('/users/login')
        .send(user)
        .end (function(err,res){
            console.log(res.body)
            expect(res).to.have.status(400)
            expect(res.body).to.have.property("message")
            expect(res.body.message).to.equal("please input your email")
            done()
        })
    })




})
