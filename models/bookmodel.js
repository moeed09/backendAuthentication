import sequelize from "../config/connect.js";
import { DataTypes } from "sequelize";
import { Author } from "./Authormodel.js";
import { Library } from "./librarymodel.js";

export const Books = sequelize.define(
  "books",
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.CHAR(50),
      allowNull: false,
    

    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    library_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
     
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Books.belongsTo(Author, {
  foreignKey: "author_id",
});
Author.hasMany(Books);

Books.belongsTo(Library, {
  foreignKey: "library_id",
});
  
  
