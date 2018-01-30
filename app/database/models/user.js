const debug = require('debug')('app:user-model')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    address: {
      type: DataTypes.STRING(40),
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        is: /^[a-z0-9_-]{2,36}$/
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    }
  })

  User.associate = (models) => {
    debug('∞ associating')
    User.hasMany(models.contract, { foreignKey: 'ownerAddress' })
  }

  return User
}
