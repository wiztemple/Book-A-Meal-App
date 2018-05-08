module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    userId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'userId is required',
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'menu description is required',
        },
      },
    },
    mealId: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      validate: {
        notEmpty: {
          args: true,
          msg: 'mealId is required',
        },
      },
    },
  });

  Menu.associate = (models) => {
    Menu.belongsTo(
      models.User,
      { foreignKey: 'userId', onDelete: 'CASCADE' },
    );
    Menu.hasMany(
      models.Meal,
      { foreignKey: 'mealId', onDelete: 'CASCADE' },
    );
  };
  return Menu;
};

