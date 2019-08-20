const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const User = require('../models/User')

chai.use(chaiHttp)

after(function(done){
    User.deleteMany()
    .then(response=>{
        console.log(response)
        console.log("database has been cleared")
        done()
    })
})

describe('POST/users/signUp', function(){

    it ('You have successfully registered account', function(done){
        
        let user = {
            username : "saveroz",
            email :"saveromuhammad@yahoo.com",
            password : "253062"
        }
        
        chai.
        request(app)
        .post('/users/signUp')
        .send(user)
        .end (function(err,res){
            // console.log(res.body)
            expect(res).to.have.status(201)
            expect(res.body.user.username).to.equal(user.username)
            expect(res.body.user.email).to.equal(user.email)
            expect(res.body.user.password).not.equal(user.password)
            done()
        })

    } )
    it ('You have failed to registered account', function(done){
        
        let user = {
            username : "saveroz",
            email :"saveromuhammad@yahoo.com",
        }
        
        chai.
        request(app)
        .post('/users/signUp')
        .send(user)
        .end (function(err,res){
            // console.log(res.body)
            expect(res).to.have.status(400)
            // expect(res.body.user.username).to.equal(user.username)
            // expect(res.body.user.email).to.equal(user.email)
            done()
        })

    } )



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
            // expect(res.body.user.username).to.equal(user.username)
            // expect(res.body.user.email).to.equal(user.email)
            // expect(res.body.user.password).not.equal(user.password)
            done()
        })

    } )
    it ('You have failed to login', function(done){
        
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
            expect(res).to.have.status(404)
            // expect(res.body).to.have.property('token')
            // expect(res.body.user.username).to.equal(user.username)
            // expect(res.body.user.email).to.equal(user.email)
            done()
        })

    } )



})