function errorHandler (err, req, res, next) {
    console.log(err);
    if (err.message=='email/password not found'){
      res.status(404).json({
        message : err.message
      })
    }
    else if(err.name=='JsonWebTokenError'){
      res.status(401).json({
        message : "invalid token"
      })
    }
    else if(err.name=="ValidationError"){
      res.status(400).json({
        message :err.message
      })
    }
    else {
      res.status(err.code || 500).json({
        message : err.message
      })
    }

    res.status(500).json({
      message: err.message,
    })
}

module.exports = errorHandler