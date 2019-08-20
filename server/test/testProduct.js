const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const Product = require('../models/Product')


chai.use(chaiHttp)

// after(function(done){
//     Product.deleteMany()
//     .then(response=>{
//         console.log(response)
//         console.log("database has been cleared")
//         done()
//     })
// })

describe('POST/Products ', function(){

    it ('created Product', function(done){
        
        let Product = {
            name : "baygon",
            description :"pembunuh nyamuk",
            price : "240",
            quantity : 66,
            image: "www.google.com"
            
        }
        
        chai.
        request(app)
        .post('/products')
        .send(Product)
        .end (function(err,res){
            console.log(res.body)
            expect(res).to.have.status(201)
            expect(res).to.be.an('object')
            expect(res.body).has.property('description')
            expect(res.body).has.property('name')
            expect(res.body).has.property('quantity')
            expect(res.body).has.property('image')
            expect(res.body).has.property('price')
            // expect(res.body.user.).to.equal(user.username)
            // expect(res.body.user.email).to.equal(user.email)
            // expect(res.body.user.password).not.equal(user.password)
            done()
        })

    } )
    it ('failed to created products', function(done){
        
        let Product = {
            username : "saveroz",
            email :"saveromuhammad@yahoo.com",
        }
        
        chai.
        request(app)
        .post('/products')
        .send(Product)
        .end (function(err,res){
            // console.log(res.body)
            expect(res).to.have.status(400)
            expect(res.body.message)
            console.log(res.body.message)
            // expect(res.body.user.username).to.equal(user.username)
            // expect(res.body.user.email).to.equal(user.email)
            done()
        })

    } )
    it ('price must be a number', function(done){
        
        let Product = {
            name : "baygon",
            description :"pembunuh nyamuk",
            price : "diamdadi",
            quantity : "mimaidmas",
            image: "www.google.com"   
        }
        
        chai.
        request(app)
        .post('/products')
        .send(Product)
        .end (function(err,res){
            // console.log(res.body)
            expect(res).to.have.status(400)
            expect(res.body.message)
            console.log(res.body.message)
            // expect(res.body.user.username).to.equal(user.username)
            // expect(res.body.user.email).to.equal(user.email)
            done()
        })

    } )


})



