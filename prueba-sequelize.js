const Usuario = require("./models/Usuario");

Usuario.findAll()
  .then((usuarios) => {
    console.log("✅ Usuarios encontrados:");
    console.log(usuarios);
  })
  .catch((error) => {
    console.error("❌ Error al consultar usuarios:", error.message);
  });