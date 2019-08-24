if(!process.env.NODE_ENV||process.env.NODE_ENV === 'development' || process.env.NODE_ENV==='test'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const port = process.env.PORT || 3000
const db_url = process.env.DB_URL
const indexRoutes = require('./routes/indexRoutes')
const errorHandler = require('./middleware/errorHandler')

mongoose.connect(db_url, {useNewUrlParser:true})
.then(()=>{
    console.log("db successfully connected")
})
.catch(()=>{
    console.log("db fail to connect")
})

app.use(express.urlencoded({extended:false})) 
app.use(express.json())
app.use(cors())
app.use('/', indexRoutes)

app.use(errorHandler)

// app.listen(port, ()=>{
//     console.log(`listening to port ${port}`)
// })
module.exports = app
