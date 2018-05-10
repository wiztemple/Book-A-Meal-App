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
    // meals: {
    //   type: DataTypes.ARRAY,
    // },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'menu description is required',
        },
      },
    },
    date: {
      type: DataTypes.DATE,
    }
  });

  Menu.associate = (models) => {
    Menu.belongsToMany(
      models.Meal,
      {
        onDelete: 'CASCADE',
        through: models.Mealmenu,
        foreignKey: 'menuId'
      },
    );
    Menu.belongsTo(
      models.User,
      {
        onDelete: 'CASCADE',
        foreignKey: 'userId'
      },
    );
  };
  return Menu;
};

