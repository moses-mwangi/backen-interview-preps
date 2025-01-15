import { DataTypes } from "sequelize";
import sequelize from "../../config/Pg_Database";
import { v4 as uuidv4 } from "uuid";
import Order from "../orderModel/ordersModels";

const generateUniqueId = () => uuidv4();

const defId = Math.floor(10000000 + Math.random() * 999999);

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: generateUniqueId,
      unique: true,
    },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    modelName: "User",
    tableName: "users",
    indexes: [{ unique: true, fields: ["email", "name"] }],
  }
);

// User.hasMany(Order, { foreignKey: "userId", as: "orders" });

export default User;
