'use strict';
module.exports = (sequelize, DataTypes) => {
  var menu = sequelize.define('menu', {
    userId: DataTypes.INTEGER
  }, {});
  menu.associate = function(models) {
    // associations can be defined here
  };
  return menu;
};