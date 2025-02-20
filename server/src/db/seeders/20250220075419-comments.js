'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', [
      {
        content: 'This is amazing tea!',
        tea_id: 1, // Соответствует id из таблицы Teas
        user_id: 2, // Соответствует id из таблицы Users
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Best tea I had in ages.',
        tea_id: 2,
        user_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Not bad, but could be better.',
        tea_id: 3,
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};