const Historial = require("../models/historial");

const obtenerHistoriales = async (req, res) => {
  try {
    const historiales = await Historial.findAll();

    res.status(200).json({
      status: 200,
      message: "Historiales obtenidos correctamente",
      data: historiales
    });

  } catch (error) {
    console.error("Error al obtener historiales:", error.message);

    res.status(500).json({
      status: 500,
      message: "Error al obtener los historiales",
      data: null
    });
  }
};

const crearHistorial = async (req, res) => {
  try {
    const { usuario_id, accion } = req.body;

    if (!usuario_id || !accion) {
      return res.status(400).json({
        status: 400,
        message: "El usuario_id y la accion son obligatorios",
        data: null
      });
    }

    const historial = await Historial.create({
      usuario_id,
      accion
    });

    res.status(201).json({
      status: 201,
      message: "Historial creado correctamente",
      data: historial
    });

  } catch (error) {
    console.error("Error al crear historial:", error.message);

    res.status(500).json({
      status: 500,
      message: "Error al crear el historial",
      data: null
    });
  }
};

const actualizarHistorial = async (req, res) => {
  try {
    const { id } = req.params;
    const { accion } = req.body;

    if (!accion) {
      return res.status(400).json({
        status: 400,
        message: "La accion es obligatoria",
        data: null
      });
    }

    const historial = await Historial.findByPk(id);

    if (!historial) {
      return res.status(404).json({
        status: 404,
        message: "Historial no encontrado",
        data: null
      });
    }

    historial.accion = accion;

    await historial.save();

    res.status(200).json({
      status: 200,
      message: "Historial actualizado correctamente",
      data: historial
    });

  } catch (error) {
    console.error("Error al actualizar historial:", error.message);

    res.status(500).json({
      status: 500,
      message: "Error al actualizar el historial",
      data: null
    });
  }
};

const eliminarHistorial = async (req, res) => {
  try {
    const { id } = req.params;

    const historial = await Historial.findByPk(id);

    if (!historial) {
      return res.status(404).json({
        status: 404,
        message: "Historial no encontrado",
        data: null
      });
    }

    await historial.destroy();

    res.status(200).json({
      status: 200,
      message: "Historial eliminado correctamente",
      data: historial
    });

  } catch (error) {
    console.error("Error al eliminar historial:", error.message);

    res.status(500).json({
      status: 500,
      message: "Error al eliminar el historial",
      data: null
    });
  }
};

module.exports = {
  obtenerHistoriales,
  crearHistorial,
  actualizarHistorial,
  eliminarHistorial
};