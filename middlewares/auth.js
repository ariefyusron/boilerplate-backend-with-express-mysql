exports.register = (req,res,next) => {
  req.check('username','Username is required').not().isEmpty()
  req.check('password', 'Password min length 8').isLength({min: 8}).equals(req.body.confirmPassword).withMessage('Confirm password is different')
  
  const error = req.validationErrors()
  if(error){
    res.status(400).json(error[0].msg)
  } else{
    req.body.password = req.bcrypt.hashSync(req.body.password, req.saltRounds)
    next()
  }
}

exports.checkAuth = (req,res,next) => {
  try{
    const token = req.headers.authorization.split(' ')[1]
    const decoded = req.jwt.verify(token,req.secret_key)
    req.userData = decoded.showUser
    next()
  } catch{
    res.status(401).json('Unauthorized')
  }
}