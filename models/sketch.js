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
      thumbnail: DataTypes.JSON,
      sketchData: DataTypes.JSON,
      userId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      promptId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'prompts',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Sketch',
      tableName: 'sketches'
    }
  )
  return Sketch
}
