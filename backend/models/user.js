import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "users",  // Ensure Sequelize uses the correct table name
  timestamps: false,   // 👈 Disable createdAt and updatedAt
});

export default User;