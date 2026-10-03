const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const UsuarioRol = sequelize.define(
  "UsuarioRol",
  {
    usuario_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },

    rol_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  },
  {
    tableName: "usuario_rol",
    timestamps: false
  }
);

module.exports = UsuarioRol;
