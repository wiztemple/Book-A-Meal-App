import bcrypt from 'bcrypt';

module.exports = {
  up: (queryInterface, Sequelize) =>
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
     */
    queryInterface.bulkInsert('Person', [
      {
        id: 1,
        firstName: 'sean',
        lastName: 'john',
        email: 'wizly@gmail.con',
        password: bcrypt.hashSync('mother1234', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        firstName: 'blue',
        lastName: 'lovely',
        email: 'lovely@gmail.con',
        password: bcrypt.hashSync('mother1234', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {}),

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
