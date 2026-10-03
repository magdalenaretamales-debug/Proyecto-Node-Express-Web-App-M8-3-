const express = require("express");
const multer = require("multer");
const path = require("path");
const verificarToken = require("../middlewares/auth.middleware");

const router = express.Router();

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Configuración de Multer
const upload = multer({
  storage,

  // Tamaño máximo: 5 MB
  limits: {
    fileSize: 5 * 1024 * 1024
  },

  // Tipos de archivos permitidos
  fileFilter: (req, file, cb) => {
    console.log("Tipo de archivo recibido:", file.mimetype);

    const tiposPermitidos = [
      "application/pdf",
      "image/jpeg",
      "image/png"
    ];

    if (tiposPermitidos.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Tipo de archivo no permitido"));
    }
  }
});

// Ruta para subir archivos
router.post("/upload", verificarToken, (req, res) => {  upload.single("archivo")(req, res, (error) => {

    // Error de Multer
    if (error instanceof multer.MulterError) {

      if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          status: 400,
          message: "El archivo supera el tamaño máximo permitido de 5 MB",
          data: null
        });
      }

      return res.status(400).json({
        status: 400,
        message: error.message,
        data: null
      });
    }

    // Otros errores, por ejemplo tipo de archivo no permitido
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
        data: null
      });
    }

    // Respuesta exitosa
    res.status(201).json({
      status: 201,
      message: "Archivo subido correctamente",
      data: {
        archivo: req.file.filename
      }
    });
  });
});

module.exports = router;