'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sketches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.STRING
      },
      sketchData: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      promptId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sketches')
  }
}
