const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
  type: DataTypes.STRING,
  allowNull: false
},

password: {
  type: DataTypes.STRING,
  allowNull: true
}
  },
  {
    tableName: "usuarios",
    timestamps: false
  }
);

module.exports = Usuario;