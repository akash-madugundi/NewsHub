import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import pkg from "pg";

const { Pool } = pkg;
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
    port: db.port,
    logging: false,
    dialectOptions: {
      ssl: process.env.DB_SSL === "true" ? {
        require: true,
        rejectUnauthorized: false
      } : false
    }
  }
);

const pool = new Pool({
  user: db.username,
  password: db.password,
  database: db.database,
  host: db.host,
  port: db.port,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Connected to PostgreSQL Database: ${db.database} at ${db.host} using Sequelize`);
  } catch (err) {
    console.error("Failed to connect to DB:", err);
    process.exit(1);
  }
};

const testPoolConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to PostgreSQL using pg Pool");
    client.release();
  } catch (err) {
    console.error("Failed to connect using pg Pool:", err);
  }
};

export { config, sequelize, pool, connectDB, testPoolConnection };