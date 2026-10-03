const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const enviarCodigoRecuperacion = async (email, codigo) => {

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Código de recuperación de contraseña",
        text: `Tu código de recuperación es: ${codigo}. Este código expira en 10 minutos.`
    });

};

module.exports = {
    enviarCodigoRecuperacion
};