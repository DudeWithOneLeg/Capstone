'use strict';


/** @type {import('sequelize-cli').Migration} */
let options = {};
module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      username: {
        allowNull:false,
        uniwue: true,
        type: Sequelize.STRING(30)
      },
      email: {
        allowNull:false,
        unique: true,
        type: Sequelize.STRING(265)
      },
      hashedPassword: {
        allowNull:false,
        type: Sequelize.STRING.BINARY
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    if (process.env.NODE_ENV === 'production') {
      options.schema = process.env.SCHEMA;  // define your schema in options object
    }

    options.tableName = 'Users'
    await queryInterface.dropTable(options);
  }
};
