import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Firstname is required',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Lastname is required',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'User already exist with this email',
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Please provide a valid email address',
        },
        notEmpty: {
          args: true,
          msg: 'Email is required',
        },
      },
    },
    role: {
      type: DataTypes.ENUM,
      values: ['customer', 'caterer'],
      validate: {
        notEmpty: {
          args: true,
          msg: 'role is required',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      len: [6, 20],
      validate: {
        notEmpty: {
          args: true,
          msg: 'password is required',
        },
      },
      set(val) {
        this.setDataValue('password', bcrypt.hashSync(val, 10));
      },
    },
  });

  // User.associate = (models) => {
  //   User.hasMany(
  //     models.Menu,
  //     { foreignKey: 'menuId', onDelete: 'CASCADE' },
  //   );
  //   User.hasMany(
  //     models.Meals,
  //     { foreignKey: 'mealId', onDelete: 'CASCADE' },
  //   );
  //   User.hasMany(
  //     models.Order,
  //     { foreignKey: 'orderId', onDelete: 'CASCADE' },
  //   );
  // };
  return User;
};
