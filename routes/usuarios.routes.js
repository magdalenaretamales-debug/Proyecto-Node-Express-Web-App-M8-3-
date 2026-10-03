const express = require("express");

const router = express.Router();

const {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  crearUsuarioConHistorial
} = require("../controllers/usuarios.controller");

router.get("/usuarios", obtenerUsuarios);

router.post("/usuarios", crearUsuario);

router.put("/usuarios/:id", actualizarUsuario);

router.delete("/usuarios/:id", eliminarUsuario);

// Ruta para probar la transacción
router.post("/usuarios/transaccion", crearUsuarioConHistorial);

module.exports = router;