exports.checkAuth = (req,res,next) => {
  try{
    const token = req.headers.authorization.split(' ')[1]
    const decoded = req.jwt.verify(token,req.secret_key)
    req.userData = decoded.showUser
    next()
  } catch(error){
    res.status(401).json('Unauthorized')
  }
}