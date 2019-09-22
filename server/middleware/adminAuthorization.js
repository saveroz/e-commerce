function adminAuthorization(req,res,next){

    try {
   
        let role = req.decode.role
        // console.log(req.decode)
        if (role==="admin" || req.body.status=="received"){
            next()
        }
        else{
            res.status(401).json(`only admin have access`)
        }
        
    }
    catch{
        // console.log(req.headers.token)
        res.status(401).json({
            message: "only admin have access"
        })
       
    }
    
}

module.exports = adminAuthorization
