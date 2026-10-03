const express = require("express");
const verificarToken = require("../middlewares/auth.middleware");

const {
  obtenerHistoriales,
  crearHistorial,
  actualizarHistorial,
  eliminarHistorial
} = require("../controllers/historial.controller");

const router = express.Router();

router.get("/historial", verificarToken, obtenerHistoriales);
router.post("/historial", crearHistorial);

router.put("/historial/:id", actualizarHistorial);

router.delete("/historial/:id", eliminarHistorial);

module.exports = router;