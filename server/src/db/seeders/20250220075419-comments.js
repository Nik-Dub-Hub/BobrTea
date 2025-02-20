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
      {
        content: 'Very tasty and fragrant!',
        tea_id: 4,
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Perfect for relaxing evenings.',
        tea_id: 5,
        user_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'The flavor is too strong for me.',
        tea_id: 6,
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Delicious and refreshing!',
        tea_id: 7,
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'I prefer other types of tea.',
        tea_id: 8,
        user_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Excellent choice for breakfast.',
        tea_id: 9,
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Great tea, highly recommended!',
        tea_id: 10,
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};