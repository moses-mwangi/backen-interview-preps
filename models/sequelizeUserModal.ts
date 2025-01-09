// src/models/user.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../utils/postgress_db";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public passwordConfirm!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const generateRandomId = (): number =>
  Math.floor(10000 + Math.random() * 99999);

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      // autoIncrement: true,
      primaryKey: true,
      defaultValue: generateRandomId,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    passwordConfirm: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);

export default User;
