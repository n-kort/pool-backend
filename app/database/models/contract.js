const debug = require('debug')('app:contract-model')

module.exports = (sequelize, DataTypes) => {
  const Contract = sequelize.define('user', {
    address: {
      type: DataTypes.STRING(40),
      primaryKey: true
    },
    ownerAddress: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    links: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    heroImage: DataTypes.STRING,
    coinImage: DataTypes.STRING
  })

  Contract.associate = (models) => {
    debug('∞ associating')
    Contract.hasOne(models.user)
  }

  return Contract
}
