const express = require("express");
const verificarToken = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/perfil", verificarToken, (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Acceso autorizado",
    data: {
      usuario: req.usuario
    }
  });
});

module.exports = router;