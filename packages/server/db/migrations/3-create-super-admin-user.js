const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const _ = require('lodash');
const SUPER_ADMIN = 1

module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log('');
    console.log('------------------- SUPER ADMIN');
    console.log('');
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash('temp', salt);

    const data = [
      {
        username: 'superadmin',
        password,
        email: 'super@temp.com',
        createdAt: moment().toDate(),
        salt,
        fkRoleId: SUPER_ADMIN,
      },
    ];

    const saveUser = await queryInterface.bulkInsert('Users', data, {
      returning: true,
    });

    const superUserData = [
      { fkUserId: _.first(saveUser).id, createdAt: moment().toDate() },
    ];

    await queryInterface.bulkInsert('SuperUsers', superUserData);
  },

  down: async (queryInterface, Sequelize) => {
    console.log('delete user');
  },
};
