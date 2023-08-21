import  sequelize  from "../config/connect.js";
import { DataTypes } from "sequelize";
import { Books } from "./bookmodel.js";

export const Library = sequelize.define(
  "library",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: false,
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Library.hasMany(Books); 



