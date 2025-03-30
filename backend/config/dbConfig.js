import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  db: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
  },
};

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

export { config, sequelize, connectDB };