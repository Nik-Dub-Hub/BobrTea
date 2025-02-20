require("dotenv").config();
const bcrypt = require("bcrypt");

// console.log(process.argv);

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "Admin2",
          email: "mrbalumba2755532@gmail.com",
          password: process.env.AP,
          // password: bcrypt.hashSync(process.env.AP, 10),
          isAdmin: true,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
