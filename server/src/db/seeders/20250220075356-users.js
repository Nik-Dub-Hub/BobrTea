'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        email: 'admin@example.com',
        password: 'hashed_password_1', // Замените на реальный хэш пароля
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'user1',
        email: 'user1@example.com',
        password: 'hashed_password_2', // Замените на реальный хэш пароля
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'user2',
        email: 'user2@example.com',
        password: 'hashed_password_3', // Замените на реальный хэш пароля
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};