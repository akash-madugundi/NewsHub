import { Sequelize } from "sequelize";
import config from "./config.js";

const { db } = config; 
const sequelize = new Sequelize(
  db.database,
  db.username,
  db.password,
  {
    host: db.host,
    dialect: db.dialect,
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Connected to PostgreSQL Database: ${db.database} at ${db.host}`);
  } catch (err) {
    console.error("Failed to connect to DB:", err);
    process.exit(1);
  }
};

export { sequelize, connectDB };