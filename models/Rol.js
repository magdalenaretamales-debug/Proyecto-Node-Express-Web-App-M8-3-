const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Rol = sequelize.define(
  "Rol",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    tableName: "rol",
    timestamps: false
  }
);

module.exports = Rol;
