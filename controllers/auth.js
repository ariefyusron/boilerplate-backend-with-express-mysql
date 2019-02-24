const models = require('../db/models');

exports.register = async (req,res) => {
  try{
    const storeUser = await models.User.create(req.body)
    await models.Profile.create({user_id: storeUser.id})
    res.json(storeUser)
  } catch{
    res.status(400).json('Username is already')
  }
}

exports.login = async (req,res) => {
  const showUser = await models.User.findOne({
    where: {
      username: req.body.username
    },
    include: {
      model: models.Profile
    }
  })
  if(!showUser){
    res.status(401).json('Username unvailable')
  } else{
    const compare = req.bcrypt.compareSync(req.body.password || '', showUser.password)
    if(!compare){
      res.status(401).json('Password invalid')
    } else{
      const token = req.jwt.sign({showUser},req.secretKey)
      res.json({
        userData: showUser,
        token
      })
    }
  }
}