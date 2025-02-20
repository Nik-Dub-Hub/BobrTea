'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Teas', [
      {
        title: 'Green Tea',
        place: 'Japan',
        img: 'green_tea_image_url',
        description: 'A refreshing traditional green tea.',
        longitude: 139.6917,
        width: 35.6895,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Black Tea',
        place: 'India',
        img: 'https://stea/',
        description: 'A rich and aromatic black tea.',
        longitude: 78.9629,
        width: 20.5937,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Oolong Tea',
        place: 'China',
        img: 'oolong_tea_image_url',
        description: 'A semi-fermented tea with a unique flavor.',
        longitude: 103.8198,
        width: 36.2048,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Teas', null, {});
  }
};