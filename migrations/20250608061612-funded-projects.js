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
    await queryInterface.createTable('FundedProjectsType', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false }
    });

    await queryInterface.bulkInsert('FundedProjectsType', [
      {name: 'Funded Project'},
      {name: 'Consultancy Project'},
    ], {});

    await queryInterface.createTable('FundedProjectStatus',{
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false }
    });

    await queryInterface.bulkInsert('FundedProjectStatus', [
      {name: 'Requested'},
      {name: 'Approved'},
      {name: 'Completed'},
    ], {});

    await queryInterface.createTable('InstitutionType', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false }
    });

    await queryInterface.bulkInsert('InstitutionType', [
      {name: 'GOVT'},
      {name: 'PVT'},
    ], {});

    await queryInterface.createTable('FundedProjects', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      typeId: {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'FundedProjectsType', key: 'id' },
        onDelete: 'NO ACTION',         // type deletions WILL cascade
        onUpdate: 'CASCADE'
      },
      statusId: {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'FundedProjectStatus', key: 'id' },
        onDelete: 'NO ACTION',         // status deletions WILL cascade
        onUpdate: 'CASCADE'
      },
      academicYear: { type: Sequelize.STRING, allowNull: false },
      projectDescription: {type: Sequelize.STRING, allowNull: false },
      nameWithDesignation: { type: Sequelize.STRING, allowNull: false },
      fundingAgency: { type: Sequelize.STRING, allowNull: false },
      institutionTypeId: {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'InstitutionType', key: 'id' },
        onDelete: 'NO ACTION',         // institution type deletions WILL cascade
        onUpdate: 'CASCADE'
      },
      porjectAmount: { type: Sequelize.DECIMAL(15, 2), allowNull: false },
      branchId: {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'Branch', key: 'id' },
        onDelete: 'NO ACTION',         // department deletions WILL cascade
        onUpdate: 'CASCADE'
      },
  })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('FundedProjects');
    await queryInterface.dropTable('InstitutionType');
    await queryInterface.dropTable('FundedProjectStatus');
    await queryInterface.dropTable('FundedProjectsType');
    
  }
};
