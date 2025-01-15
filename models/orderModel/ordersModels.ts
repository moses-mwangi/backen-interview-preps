import sequelize from "../../config/Pg_Database";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import User from "../userModel/usersModels";

const generateUniqueId = () => uuidv4();

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: generateUniqueId,
      allowNull: false,
    },
    product: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    modelName: "Order",
    tableName: "orders",
    timestamps: true,
    indexes: [{ unique: true, fields: ["product"] }],
  }
);

User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

export default Order;
