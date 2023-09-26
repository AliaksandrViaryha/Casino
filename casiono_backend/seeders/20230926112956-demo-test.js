'use strict';
const fs = require('fs');

const readData = fs.readFileSync('data.json', 'utf-8');
const data = JSON.parse(readData);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = data.map((category) => ({
      title: category.categoryName,
      slug: category.slug,
      creationDate: new Date(),
      updatedOn: new Date(),
    }));

    const newCategories = await queryInterface.bulkInsert(
      'Categories',
      categories,
      {
        returning: true,
      },
    );

    const games = [];

    for (let i = 0; i < newCategories.length; i++) {
      const category = newCategories[i];
      const categoryGames = data[i].games;
      for (const game of categoryGames) {
        games.push({
          title: game.title,
          url: game.iconUrl,
          category_id: category.id,
          creationDate: new Date(),
          updatedOn: new Date(),
        });
      }
    }

    await queryInterface.bulkInsert('Games', games);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
