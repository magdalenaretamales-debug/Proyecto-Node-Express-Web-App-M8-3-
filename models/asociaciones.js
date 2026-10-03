const Usuario = require("./Usuario");
const Historial = require("./historial");
const Perfil = require("./Perfil");
const Rol = require("./Rol");
const UsuarioRol = require("./UsuarioRol");

// Relación 1:N
Usuario.hasMany(Historial, {
  foreignKey: "usuario_id"
});

Historial.belongsTo(Usuario, {
  foreignKey: "usuario_id"
});

// Relación 1:1
Usuario.hasOne(Perfil, {
  foreignKey: "usuario_id"
});

Perfil.belongsTo(Usuario, {
  foreignKey: "usuario_id"
});

// Relación N:M
Usuario.belongsToMany(Rol, {
  through: UsuarioRol,
  foreignKey: "usuario_id",
  otherKey: "rol_id"
});

Rol.belongsToMany(Usuario, {
  through: UsuarioRol,
  foreignKey: "rol_id",
  otherKey: "usuario_id"
});