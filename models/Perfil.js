const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Perfil = sequelize.define(
  "Perfil",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },

    telefono: {
      type: DataTypes.STRING,
      allowNull: true
    },

    direccion: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    tableName: "perfil",
    timestamps: false
  }
);

module.exports = Perfil;
