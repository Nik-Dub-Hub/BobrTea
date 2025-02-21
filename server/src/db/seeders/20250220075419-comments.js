"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Comments", [
      {
        content: "This is amazing tea!",
        tea_id: 8,
        user_id: 12, 
      },
      {
        content: "Best tea I had in ages.",
        tea_id: 9,
        user_id: 12,
      },
      {
        content: "Not bad, but could be better.",
        tea_id: 8,
        user_id: 12,
      },
      {
        content: "Very tasty and fragrant!",
        tea_id: 9,
        user_id: 12,
      },
      {
        content: "Perfect for relaxing evenings.",
        tea_id: 8,
        user_id: 5,
      },
      {
        content: "The flavor is too strong for me.",
        tea_id: 8,
        user_id: 5,
      },
      {
        content: "Delicious and refreshing!",
        tea_id: 9,
        user_id: 14,
      },
      {
        content: "I prefer other types of tea.",
        tea_id: 8,
        user_id: 15,
      },
      {
        content: "Excellent choice for breakfast.",
        tea_id: 9,
        user_id: 8,
      },
      {
        content: "Great tea, highly recommended!",
        tea_id: 8,
        user_id: 12,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Comments", null, {});
  },
};
