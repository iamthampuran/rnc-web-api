'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('PublicationStatus', {
      id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
      name: {type: Sequelize.STRING, allowNull: false},
    });

    await queryInterface.createTable('Publications', {
      id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
      academicYear: {type: Sequelize.STRING, allowNull: false},
      title: {type: Sequelize.STRING, allowNull: false},
      affiliated: {type: Sequelize.BOOLEAN, allowNull: false},
      name: {type: Sequelize.STRING, allowNull: false},
      details: {type: Sequelize.STRING, allowNull: false},
      impactFactor: {type: Sequelize.STRING, allowNull: false},
      typeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Type',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      subtypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'SubType',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      statusId:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'PublicationStatus',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      createdUserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      branchId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Branch',
          key: 'id'
        },
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
      },
      createdAt:{type:Sequelize.DATE, defaultValue:new Date()},
      updatedAt:{type:Sequelize.DATE, defaultValue:new Date()}
    });

    await queryInterface.bulkInsert('PublicationStatus', [
      {name: 'Requested'},
      {name: 'Approved'},
      {name: 'Rejected'}
    ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('UserPublications');
    await queryInterface.dropTable('Publications');
    await queryInterface.dropTable('PublicationStatus');
  }
};
