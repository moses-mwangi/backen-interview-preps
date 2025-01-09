import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "postgres://postgres:password@localhost:5432/postgres",
  {
    dialect: "postgres",
  }
);
