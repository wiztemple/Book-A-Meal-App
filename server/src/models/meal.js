

module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
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
  Meal.associate = (models) => {
    // associations can be defined here
    Meal.belongsTo(
      models.Menu,
      { foreignKey: 'menuId', onDelete: 'CASCADE' },
    );
    Meal.belongsTo(
      models.User,
      { foreignKey: 'userId', onDelete: 'CASCADE' },
    );
  };
  return Meal;
};
