const models = require('../db/models');

exports.showUser = async (req,res) => {
  const showUser = await models.Profile.findOne({
    where: {
      user_id: req.userData.id
    }
  })
  res.json(showUser)
}