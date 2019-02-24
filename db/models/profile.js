'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    gender: {
      type: DataTypes.ENUM,
      values: ['Male','Female']
    },
    birth: DataTypes.DATE
  }, {});
  Profile.associate = function(models) {
    // associations can be defined here
    Profile.belongsTo(models.User, {
      foreignKey: 'user_id'
    })
  };
  return Profile;
};