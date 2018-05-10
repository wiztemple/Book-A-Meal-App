

module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    userId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'userId is required',
        },
      },
    },
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
    Meal.belongsToMany(
      models.Menu,
      {
        onDelete: 'CASCADE',
        foreignKey: 'mealId',
        through: models.Mealmenu,
      },
    );
  };
  return Meal;
};
