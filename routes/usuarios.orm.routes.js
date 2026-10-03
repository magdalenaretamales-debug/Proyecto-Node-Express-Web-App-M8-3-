const express = require("express");

const Perfil = require("../models/Perfil");
const Usuario = require("../models/Usuario");
const Historial = require("../models/historial");
const Rol = require("../models/Rol");

const router = express.Router();


// ==========================================
// OBTENER USUARIOS USANDO SEQUELIZE ORM
// ==========================================

router.get("/usuarios-orm", async (req, res) => {

  try {

    const usuarios = await Usuario.findAll({
      order: [["id", "ASC"]]
    });

    res.json(usuarios);

  } catch (error) {

    console.error(
      "Error al obtener usuarios con ORM:",
      error.message
    );

    res.status(500).json({
      error: "Error al obtener los usuarios con ORM"
    });

  }

});



// ==========================================
// OBTENER USUARIOS JUNTO CON SU HISTORIAL
// ==========================================

router.get("/usuarios-orm-historial", async (req, res) => {

  try {

    const usuarios = await Usuario.findAll({

      // Ordenar usuarios por ID ascendente
      order: [["id", "ASC"]],

      include: {

        model: Historial,

        attributes: [
          "id",
          "accion",
          "fecha"
        ]

      }

    });


    res.json(usuarios);

  } catch (error) {

    console.error(
      "Error al obtener usuarios con historial:",
      error.message
    );

    res.status(500).json({
      error: "Error al obtener los usuarios con historial"
    });

  }

});



// ==========================================
// OBTENER USUARIOS JUNTO CON SU PERFIL
// ==========================================

router.get("/usuarios-orm-perfil", async (req, res) => {

  try {

    const usuarios = await Usuario.findAll({

      order: [["id", "ASC"]],

      include: {

        model: Perfil,

        attributes: [
          "id",
          "telefono",
          "direccion"
        ]

      }

    });


    res.status(200).json({

      status: 200,

      message:
        "Usuarios y perfiles obtenidos correctamente",

      data:
        usuarios

    });

  } catch (error) {

    console.error(
      "Error al obtener usuarios con perfil:",
      error.message
    );

    res.status(500).json({

      status: 500,

      message:
        "Error al obtener usuarios con perfil",

      data: null

    });

  }

});



// ==========================================
// OBTENER USUARIOS JUNTO CON SUS ROLES
// ==========================================

router.get("/usuarios-orm-roles", async (req, res) => {

  try {

    const usuarios = await Usuario.findAll({

      attributes: [
        "id",
        "nombre",
        "email"
      ],

      order: [["id", "ASC"]],

      include: {

        model: Rol,

        attributes: [
          "id",
          "nombre"
        ],

        through: {
          attributes: []
        }

      }

    });


    res.status(200).json({

      status: 200,

      message:
        "Usuarios y roles obtenidos correctamente",

      data:
        usuarios

    });

  } catch (error) {

    console.error(
      "Error al obtener usuarios con roles:",
      error.message
    );

    res.status(500).json({

      status: 500,

      message:
        "Error al obtener usuarios con roles",

      data: null

    });

  }

});



// ==========================================
// EXPORTAR ROUTER
// ==========================================

module.exports = router;