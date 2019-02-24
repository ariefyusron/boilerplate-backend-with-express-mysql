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