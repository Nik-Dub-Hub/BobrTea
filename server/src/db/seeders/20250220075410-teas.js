'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Teas", [
      {
        title: "Green Tea",
        place: "Japan",
        img: "https://media.istockphoto.com/id/1351381197/ru/фото/теплый-зеленый-чай-на-деревянном-столе.jpg?s=1024x1024&w=is&k=20&c=pz86vVywMz87S1B6OYJ6UvOBGuAqoZAxtMjRxvhO8h0=",
        description: "A refreshing traditional green tea.",
        longitude: 139.6917,
        width: 35.6895,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Black Tea",
        place: "India",
        img: "https://static.tildacdn.info/tild6266-3866-4335-b335-616263346631/-/resize/504x/vidy-chernogo-chaya.jpg",
        description: "A rich and aromatic black tea.",
        longitude: 78.9629,
        width: 20.5937,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Oolong Tea",
        place: "China",
        img: "https://mallofsplit.hr/wp-content/uploads/2017/06/svijet-caja.jpg",
        description: "A semi-fermented tea with a unique flavor.",
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