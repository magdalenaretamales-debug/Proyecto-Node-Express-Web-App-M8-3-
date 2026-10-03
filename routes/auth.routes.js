const express = require("express");

const {
  login,
  recuperar,
  cambiarContrasena
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/login", login);

router.post("/recuperar", recuperar);

router.post("/cambiar-contrasena", cambiarContrasena);

module.exports = router;