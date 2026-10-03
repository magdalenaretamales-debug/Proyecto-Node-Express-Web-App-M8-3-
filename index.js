// Importa Express para crear el servidor
const express = require("express");

// Importa las rutas de usuarios
const usuariosRoutes = require("./routes/usuarios.routes");
const usuariosOrmRoutes = require("./routes/usuarios.orm.routes");
const historialRoutes = require("./routes/historial.routes");
const authRoutes = require("./routes/auth.routes");
const perfilRoutes = require("./routes/perfil.routes");
const uploadRoutes = require("./routes/upload.routes");

require("./models/asociaciones");

// Importa fs (File System) para trabajar con archivos
const fs = require("fs");

// Registra una visita en el archivo log.txt
function registrarVisita(ruta) {
  const fecha = new Date();

  const registro = `${fecha.toLocaleDateString()} - ${fecha.toLocaleTimeString()} - ${ruta}\n`;

  fs.appendFile("log.txt", registro, (error) => {
    if (error) {
      console.error("Error al registrar la visita:", error);
    }
  });
}

// Crea una aplicación de Express
const app = express();

// Permite recibir datos en formato JSON
app.use(express.json());

// Permite servir archivos estáticos desde la carpeta public
app.use(express.static("public"));

// Activa las rutas de usuarios
app.use(usuariosRoutes);

// Activa las rutas de usuarios con Sequelize ORM
app.use(usuariosOrmRoutes);

// Activa las rutas de historial
app.use(historialRoutes);

app.use(authRoutes);

app.use(perfilRoutes);

app.use(uploadRoutes);

// Ruta principal que devuelve una respuesta en HTML
app.get("/", (req, res) => {
  res.send("<h1>Bienvenido a mi proyecto Node y Express</h1>");
});

// Ruta /status que devuelve una respuesta en formato JSON
app.get("/status", (req, res) => {
  registrarVisita("/status");

  res.json({
    estado: "Servidor funcionando correctamente",
    puerto: 3000
  });
});

// Inicia el servidor
app.listen(3000, () => {
  console.log("Servidor funcionando en http://localhost:3000");
});