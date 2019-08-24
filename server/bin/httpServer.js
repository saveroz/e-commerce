if(!process.env.NODE_ENV||process.env.NODE_ENV === 'development' || process.env.NODE_ENV==='test'){
    require('dotenv').config()
}

const app = require('../app')
const http = require('http')
const server = http.createServer(app)
const port = process.env.PORT


server.listen(port, ()=>{
    console.log(`listening to port ${port}`)
})
