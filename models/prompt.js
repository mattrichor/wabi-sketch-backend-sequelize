'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Prompt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Prompt.hasMany(models.Sketch, {
        foreignKey: 'promptId'
      })
      // define association here
    }
  }
  Prompt.init(
    {
      date: DataTypes.STRING,
      text: DataTypes.STRING,
      colors: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Prompt',
      tableName: 'prompts'
    }
  )
  return Prompt
}
