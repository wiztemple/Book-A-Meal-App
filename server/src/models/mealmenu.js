module.exports = (sequelize, DataTypes) => {
  const Mealmenu = sequelize.define('Mealmenu', {
    mealId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'userId is required',
        },
      },
    },
    menuId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'mealId is required',
        },
      },
    },
  }, {});
  return Mealmenu;
};
