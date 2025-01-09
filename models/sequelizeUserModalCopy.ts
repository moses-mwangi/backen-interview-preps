import { sequelize } from "../utils/postgress_db";
import { DataTypes } from "sequelize";

const randomId = Math.floor(10000 + Math.random() * 98298);

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    defaultValue: randomId,
    unique: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  passwordConfirm: { type: DataTypes.STRING },
  role: {
    type: DataTypes.ENUM("user", "admin", "manager"),
    defaultValue: "user",
    allowNull: false,
  },
});

const Post = sequelize.define("Post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

User.hasMany(Post, { foreignKey: "userId", as: "posts" });
Post.belongsTo(User, { foreignKey: "userId", as: "user" });

export { User, Post };
