export default (sequelize, DataTypes) => {
  const Meals = sequelize.define('Meals', {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'meal title is required',
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'meal description is required',
        },
      },
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'meal price is required',
        },
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
  });

  Meals.associate = (models) => {
    Meals.belongsTo(
      models.Menu,
      { foreignKey: 'menuId', onDelete: 'CASCADE' },
    );
    Meals.belongsTo(
      models.User,
      { foreignKey: 'userId', onDelete: 'CASCADE' },
    );
    // Meals.hasMany(
    //   models.Order,
    //   { foreignKey: 'orderId', onDelete: 'CASCADE' },
    // );
  };
  return Meals;
};
