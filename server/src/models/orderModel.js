export default (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    userId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'user Id is required',
        },
      },
    },
    mealId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'meal Id is required',
        },
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'quantity is required',
        },
      },
    },
    deliveryAddress: {
      type: DataTypes.TEXT,
      notEmpty: {
        args: true,
        msg: 'delivery address is required',
      },
    },
  });


  // Order.associate = (models) => {
  //   Order.belongsTo(
  //     models.User,
  //     { foreignKey: 'userId', onDelete: 'CASCADE' },
  //   );
  //   Order.hasMany(
  //     models.Meals,
  //     { foreignKey: 'mealId', onDelete: 'CASCADE' },
  //   );
  // };
  return Order;
};

