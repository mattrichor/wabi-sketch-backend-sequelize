'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Sketch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sketch.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Sketch.belongsTo(models.Prompt, {
        foreignKey: 'promptId'
      })
      // define association here
    }
  }
  Sketch.init(
    {
      date: DataTypes.STRING,
      sketchData: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      promptId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Sketch',
      tableName: 'sketches'
    }
  )
  return Sketch
}
