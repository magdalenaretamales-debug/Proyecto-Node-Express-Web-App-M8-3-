const connection = require("../db");
const bcrypt = require("bcryptjs");


// ==========================================
// OBTENER USUARIOS
// ==========================================

const obtenerUsuarios = async (req, res) => {
  try {

    const { nombre, email } = req.query;

    let query = "SELECT id, nombre, email FROM usuarios";

    let values = [];

    let condiciones = [];


    if (nombre) {

      condiciones.push(
        `nombre ILIKE $${values.length + 1}`
      );

      values.push(`%${nombre}%`);

    }


    if (email) {

      condiciones.push(
        `email ILIKE $${values.length + 1}`
      );

      values.push(`%${email}%`);

    }


    if (condiciones.length > 0) {

      query +=
        " WHERE " +
        condiciones.join(" AND ");

    }


    // Ordenar usuarios por ID
    query += " ORDER BY id ASC";


    const resultado =
      await connection.query(
        query,
        values
      );


    res.status(200).json({

      status: 200,

      message:
        "Usuarios obtenidos correctamente",

      data:
        resultado.rows

    });


  } catch (error) {

    console.error(
      "Error al obtener usuarios:",
      error.message
    );


    res.status(500).json({

      status: 500,

      message:
        "Error al obtener los usuarios",

      data: null

    });

  }
};



// ==========================================
// CREAR USUARIO + HISTORIAL
// ==========================================

const crearUsuario = async (req, res) => {

  const client =
    await connection.connect();


  try {

    const {
      nombre,
      email,
      password
    } = req.body;


    // Validación

    if (!nombre || !email || !password) {

      return res.status(400).json({

        status: 400,

        message:
          "El nombre, el email y la contraseña son obligatorios",

        data: null

      });

    }


    // Encriptar contraseña

    const passwordEncriptada =
      await bcrypt.hash(
        password,
        10
      );


    // Iniciar transacción

    await client.query("BEGIN");


    // ==========================================
    // CREAR USUARIO
    // ==========================================

    const resultado =
      await client.query(

        `INSERT INTO usuarios
          (nombre, email, password)

         VALUES
          ($1, $2, $3)

         RETURNING
          id,
          nombre,
          email`,

        [
          nombre,
          email,
          passwordEncriptada
        ]

      );


    const usuario =
      resultado.rows[0];


    // ==========================================
    // CREAR HISTORIAL
    // ==========================================

    await client.query(

      `INSERT INTO historial
        (usuario_id, accion)

       VALUES
        ($1, $2)`,

      [
        usuario.id,
        "Usuario creado"
      ]

    );


    // Confirmar transacción

    await client.query("COMMIT");


    // ==========================================
    // RESPUESTA
    // ==========================================

    res.status(201).json({

      status: 201,

      message:
        "Usuario creado correctamente",

      data:
        usuario,

      // Estas propiedades mantienen
      // compatibilidad con nuestro HTML

      id:
        usuario.id,

      nombre:
        usuario.nombre,

      email:
        usuario.email

    });


  } catch (error) {


    // Si algo falla,
    // deshacer usuario + historial

    await client.query("ROLLBACK");


    console.error(
      "Error al crear usuario:",
      error.message
    );


    res.status(500).json({

      status: 500,

      message:
        "Error al crear el usuario",

      data: null

    });


  } finally {

    client.release();

  }

};



// ==========================================
// ACTUALIZAR USUARIO
// ==========================================

const actualizarUsuario = async (req, res) => {

  try {

    const { id } =
      req.params;


    const {
      nombre,
      email
    } = req.body;


    if (!nombre || !email) {

      return res.status(400).json({

        status: 400,

        message:
          "El nombre y el email son obligatorios",

        data: null

      });

    }


    const resultado =
      await connection.query(

        `UPDATE usuarios

         SET
          nombre = $1,
          email = $2

         WHERE id = $3

         RETURNING
          id,
          nombre,
          email`,

        [
          nombre,
          email,
          id
        ]

      );


    if (
      resultado.rows.length === 0
    ) {

      return res.status(404).json({

        status: 404,

        message:
          "Usuario no encontrado",

        data: null

      });

    }


    res.status(200).json({

      status: 200,

      message:
        "Usuario actualizado correctamente",

      data:
        resultado.rows[0]

    });


  } catch (error) {

    console.error(
      "Error al actualizar usuario:",
      error.message
    );


    res.status(500).json({

      status: 500,

      message:
        "Error al actualizar el usuario",

      data: null

    });

  }

};



// ==========================================
// ELIMINAR USUARIO
// ==========================================

const eliminarUsuario = async (req, res) => {

  try {

    const { id } =
      req.params;


    const usuario =
      await connection.query(

        "SELECT id FROM usuarios WHERE id = $1",

        [id]

      );


    if (
      usuario.rows.length === 0
    ) {

      return res.status(404).json({

        status: 404,

        message:
          "Usuario no encontrado",

        data: null

      });

    }


    await connection.query(

      "DELETE FROM usuarios WHERE id = $1",

      [id]

    );


    res.status(200).json({

      status: 200,

      message:
        "Usuario eliminado correctamente",

      data: null

    });


  } catch (error) {

    console.error(
      "Error al eliminar usuario:",
      error.message
    );


    res.status(500).json({

      status: 500,

      message:
        "Error al eliminar el usuario",

      data: null

    });

  }

};



// ==========================================
// CREAR USUARIO CON TRANSACCIÓN
// ==========================================

const crearUsuarioConHistorial = async (req, res) => {

  const client =
    await connection.connect();


  try {

    const {
      nombre,
      email
    } = req.body;


    if (!nombre || !email) {

      return res.status(400).json({

        status: 400,

        message:
          "El nombre y el email son obligatorios",

        data: null

      });

    }


    await client.query("BEGIN");


    // Crear usuario

    const usuario =
      await client.query(

        `INSERT INTO usuarios
          (nombre, email)

         VALUES
          ($1, $2)

         RETURNING
          id,
          nombre,
          email`,

        [
          nombre,
          email
        ]

      );


    // Crear historial

    await client.query(

      `INSERT INTO historial
        (usuario_id, accion)

       VALUES
        ($1, $2)`,

      [
        usuario.rows[0].id,
        "Usuario creado"
      ]

    );


    await client.query("COMMIT");


    res.status(201).json({

      status: 201,

      message:
        "Usuario creado y registrado correctamente",

      data:
        usuario.rows[0]

    });


  } catch (error) {


    await client.query("ROLLBACK");


    console.error(
      "Error en la transacción:",
      error.message
    );


    res.status(500).json({

      status: 500,

      message:
        "La transacción fue cancelada",

      data: null

    });


  } finally {

    client.release();

  }

};



// ==========================================
// EXPORTAR FUNCIONES
// ==========================================

module.exports = {

  obtenerUsuarios,

  crearUsuario,

  actualizarUsuario,

  eliminarUsuario,

  crearUsuarioConHistorial

};