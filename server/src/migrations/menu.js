module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Menu', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        reference: {
          model: 'Users',
          key: 'id',
          as: 'userMenu',
        },
      },
      description: {
        type: Sequelize.STRING,
      },
      mealId: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        reference: {
        model: 'Meals',
        key: 'id',
          },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable('Menu', { force: true });
  },
};
