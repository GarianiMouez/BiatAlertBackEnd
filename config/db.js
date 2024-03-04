require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

const databaseConnexion = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connexion à la base de données réussie.");
  } catch (error) {
    console.error("Impossible de se connecter à la base de données:", error);
  }
};

module.exports = { databaseConnexion, sequelize };
