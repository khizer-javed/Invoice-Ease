'use strict';
const moment = require('moment-timezone');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    console.log('');
    console.log('------------------- ROLES');
    console.log('');
    const roles = [
      { name: 'SuperAdmin', createdAt: moment().toDate() },
      { name: 'User', createdAt: moment().toDate() },
    ];
    await queryInterface.bulkInsert('Roles', roles);
  },

  async down(queryInterface, Sequelize) {
    console.log('delete Roles');
  },
};
