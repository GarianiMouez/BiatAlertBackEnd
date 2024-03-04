const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Application = sequelize.define("Application", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Application;
