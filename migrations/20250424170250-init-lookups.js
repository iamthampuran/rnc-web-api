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

        // 1) Create tables
        await queryInterface.createTable('Branch', {
          id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
          name: { type: Sequelize.STRING, allowNull: false }
        });
        await queryInterface.createTable('UserRole', {
          id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
          role: { type: Sequelize.STRING, allowNull: false }
        });
        await queryInterface.createTable('Type', {
          id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
          type_name: { type: Sequelize.STRING, allowNull: false }
        });
        await queryInterface.createTable('SubType', {
          id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
          subtype_name: { type: Sequelize.STRING, allowNull: false }
        });
    
        // 2) Seed data
        await queryInterface.bulkInsert('Branch', [
          { name: 'Computer Science Engineering' },
          { name: 'Mechanical Engineering' },
          { name: 'Electrical Engineering' },
        ], {});
    
        await queryInterface.bulkInsert('UserRole', [
          { role: 'Faculty' },
          { role: 'Admin' },
          { role: 'Member' },
        ], {});
    
        await queryInterface.bulkInsert('Type', [
          { type_name: 'Journal' },
          { type_name: 'Conference' },
          { type_name: 'Book' },
        ], {});
    
        await queryInterface.bulkInsert('SubType', [
          { subtype_name: 'SCI' },
          { subtype_name: 'SCOPUS' },
          { subtype_name: 'National' },
          { subtype_name: 'International' },
          { subtype_name: 'Other' },
        ], {});
    


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    // Drop in reverse order
    await queryInterface.dropTable('SubType');
    await queryInterface.dropTable('Type');
    await queryInterface.dropTable('UserRole');
    await queryInterface.dropTable('Branch');


  }
};
