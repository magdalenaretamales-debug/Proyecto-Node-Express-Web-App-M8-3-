require("dotenv").config();

const { enviarCodigoRecuperacion } = require("./services/email.service");

const probarCorreo = async () => {
    try {
        await enviarCodigoRecuperacion(
            "magdalenaretamales@gmail.com",
            "123456"
        );

        console.log("✅ Correo enviado correctamente");
    } catch (error) {
        console.error("❌ Error al enviar el correo:");
        console.error(error.message);
    }
};

probarCorreo();