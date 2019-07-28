'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('SELECT id FROM Users;').then(users => {
      const usersRows = users[0]

      return queryInterface.bulkInsert(
        'Posts',
        [
          {
            text: 'Lorem ipsum 1',
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: usersRows[0].id,
          },
          {
            text: 'Lorem ipsum 2',
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: usersRows[1].id,
          },
        ],
        {}
      )
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {})
  },
}
