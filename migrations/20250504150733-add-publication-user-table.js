'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    try {
      await queryInterface.createTable('UserPublications', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        userId: {
          type: Sequelize.INTEGER, allowNull: false,
          references: { model: 'Users', key: 'id' },
          onDelete: 'NO ACTION',         // user deletions WILL cascade
          onUpdate: 'CASCADE'
        },
        publicationId: {
          type: Sequelize.INTEGER, allowNull: false,
          references: { model: 'Publications', key: 'id' },
          onDelete: 'NO ACTION',       // publication deletions will NOT cascade
          onUpdate: 'CASCADE'
        }
      })
    }
    catch (error) {
      console.error('Error creating UserPublications table:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('UserPublications');
  }
};
