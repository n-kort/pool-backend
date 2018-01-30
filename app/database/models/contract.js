const debug = require('debug')('app:contract-model')

module.exports = (sequelize, DataTypes) => {
  const Contract = sequelize.define('contract', {
    address: {
      type: DataTypes.STRING(50),
      primaryKey: true
    },
    ownerAddress: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    heroImage: DataTypes.STRING,
    coinImage: DataTypes.STRING
  })

  Contract.associate = (models) => {
    debug('∞ associating')
    Contract.belongsTo(models.user, { foreignKey: 'ownerAddress' })
    Contract.hasMany(models.links)
  }

  return Contract
}
