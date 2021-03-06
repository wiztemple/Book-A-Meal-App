import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
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
      values: ['customer', 'caterer', 'admin'],
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
  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(
      models.Menu,
      { foreignKey: 'userId', onDelete: 'CASCADE' },
    );
    User.hasMany(
      models.Meal,
      { foreignKey: 'userId', onDelete: 'CASCADE' },
    );
    User.hasMany(
      models.Order,
      { foreignKey: 'userId', onDelete: 'CASCADE' },
    );
  };
  return User;
};
