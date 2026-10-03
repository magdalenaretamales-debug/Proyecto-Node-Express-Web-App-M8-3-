# Proyecto 7 — Node & Express Web App

## Acceso a datos, PostgreSQL, CRUD, transacciones y Sequelize ORM

Aplicación backend desarrollada con **Node.js y Express.js**, integrada con una base de datos **PostgreSQL** para gestionar información de usuarios.

Este proyecto corresponde a la **Parte 2 – Módulo 7: Acceso a datos en aplicaciones Node**, donde se amplía la aplicación desarrollada en el módulo anterior incorporando persistencia real en una base de datos, operaciones CRUD, transacciones, modelos mediante Sequelize ORM y relaciones entre entidades.

La aplicación permite trabajar con usuarios y su historial, combinando consultas SQL tradicionales mediante `pg` con el uso de **Sequelize ORM** para modelar entidades y consultar relaciones.

---

# 1. Objetivo del proyecto

El objetivo principal es integrar una aplicación desarrollada con Node.js y Express con una base de datos relacional PostgreSQL, permitiendo:

* Conectar el servidor con una base de datos real.
* Gestionar usuarios mediante operaciones CRUD.
* Validar los datos recibidos.
* Manejar errores de conexión y consultas.
* Implementar transacciones para mantener la consistencia de los datos.
* Incorporar Sequelize como ORM.
* Crear modelos relacionados.
* Consultar relaciones mediante `include`.
* Mostrar información relacionada en formato JSON y HTML.
* Mantener una estructura modular de rutas, controladores, modelos y configuración de base de datos.

---

# 2. Tecnologías utilizadas

## Backend

* **Node.js** — entorno de ejecución de JavaScript.
* **Express.js** — framework utilizado para construir el servidor y gestionar las rutas.
* **PostgreSQL** — sistema de gestión de base de datos relacional.
* **pg** — cliente de PostgreSQL para Node.js.
* **Sequelize** — ORM utilizado para definir modelos y relaciones y realizar consultas mediante métodos de JavaScript.
* **dotenv** — gestión de variables de entorno.
* **nodemon** — herramienta utilizada durante el desarrollo para reiniciar automáticamente el servidor.

## Frontend

* HTML5
* CSS3
* JavaScript

## Herramientas utilizadas

* Visual Studio Code
* PostgreSQL
* pgAdmin 4
* Postman
* Git
* GitHub

---

# 3. Requisitos del sistema

Para ejecutar el proyecto se requiere:

* Node.js versión 18 o superior.
* npm, incluido con Node.js.
* PostgreSQL.
* pgAdmin 4 o una herramienta equivalente para administrar la base de datos.
* Un navegador web.
* Postman u otra herramienta para realizar pruebas de las rutas.

Durante el desarrollo del proyecto se utilizó Node.js versión **24.19.0**.

---

# 4. Instalación del proyecto

Clonar el repositorio desde GitHub y acceder a la carpeta del proyecto.

Instalar las dependencias mediante:

```bash
npm install
```

Las dependencias principales utilizadas en el proyecto son:

```text
express
dotenv
pg
sequelize
```

Además, `nodemon` se encuentra configurado como dependencia de desarrollo.

---

# 5. Configuración de variables de entorno

Para proteger las credenciales de acceso a PostgreSQL se utiliza un archivo `.env`.

La aplicación obtiene desde este archivo los datos necesarios para establecer la conexión con la base de datos.

Ejemplo de configuración:

```env
DB_USER=tu_usuario
DB_HOST=localhost
DB_NAME=Proyecto7
DB_PASSWORD=tu_password
DB_PORT=5432
```

El archivo `.env` contiene información sensible y no debe ser publicado en GitHub.

Por esta razón se encuentra incluido en `.gitignore`.

### Variables utilizadas

| Variable      | Descripción                            |
| ------------- | -------------------------------------- |
| `DB_USER`     | Usuario de PostgreSQL                  |
| `DB_HOST`     | Servidor donde se encuentra PostgreSQL |
| `DB_NAME`     | Nombre de la base de datos             |
| `DB_PASSWORD` | Contraseña del usuario                 |
| `DB_PORT`     | Puerto utilizado por PostgreSQL        |

---

# 6. Conexión con PostgreSQL

La conexión tradicional con PostgreSQL se encuentra implementada en:

```text
db.js
```

Para establecer la conexión se utiliza el módulo `pg` y su objeto `Pool`.

La configuración obtiene las credenciales desde las variables de entorno:

```javascript
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});
```

Se implementaron eventos para informar el estado de la conexión:

```text
✅ Conexión exitosa a PostgreSQL
```

También se controla la aparición de errores en el pool.

El uso de variables de entorno permite separar la configuración sensible del código fuente y evita almacenar directamente las credenciales dentro de los archivos JavaScript.

---

# 7. Base de datos

Para este proyecto se utilizó una base de datos PostgreSQL denominada:

```text
Proyecto7
```

Dentro de la base de datos se trabajan principalmente las entidades:

```text
usuarios
historial
```

La relación entre ambas permite asociar registros del historial con los usuarios correspondientes.

---

# 8. Estructura del proyecto

La estructura principal del proyecto es:

```text
proyecto-7/
│
├── controllers/
│   └── usuarios.controller.js
│
├── models/
│   ├── Usuario.js
│   └── historial.js
│
├── middlewares/
│
├── logs/
│
├── public/
│   ├── index.html
│   └── style.css
│
├── routes/
│   ├── usuarios.routes.js
│   └── usuarios.orm.routes.js
│
├── .env
├── .gitignore
├── db.js
├── index.js
├── log.txt
├── package.json
├── package-lock.json
├── prueba-sequelize.js
├── readme.md
└── sequelize.js
```

La aplicación se organiza separando responsabilidades:

* `controllers/`: contiene la lógica de las operaciones sobre los usuarios.
* `routes/`: contiene las rutas HTTP.
* `models/`: contiene los modelos utilizados por Sequelize.
* `public/`: contiene la interfaz HTML y los estilos CSS.
* `db.js`: configura la conexión tradicional con PostgreSQL.
* `sequelize.js`: configura la conexión mediante Sequelize.
* `index.js`: punto de entrada y configuración principal del servidor.
* `prueba-sequelize.js`: archivo utilizado para comprobar consultas mediante Sequelize.
* `log.txt`: archivo utilizado para registrar visitas a determinadas rutas.

Las carpetas `middlewares/` y `logs/` se mantienen dentro de la estructura del proyecto, pero no contienen funcionalidades adicionales implementadas en esta etapa.

---

# 9. Configuración de Express

El archivo principal de la aplicación es:

```text
index.js
```

Express se utiliza para crear el servidor y gestionar las solicitudes HTTP.

También se habilita el procesamiento de datos JSON:

```javascript
app.use(express.json());
```

Y se configura la carpeta `public` para servir contenido estático:

```javascript
app.use(express.static("public"));
```

Las rutas de usuarios y las rutas que utilizan Sequelize se incorporan al servidor mediante:

```javascript
app.use(usuariosRoutes);
app.use(usuariosOrmRoutes);
```

---

# 10. Ejecución del servidor

El proyecto posee los siguientes scripts:

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

Para ejecutar el servidor normalmente:

```bash
npm start
```

Para ejecutarlo durante el desarrollo utilizando nodemon:

```bash
npm run dev
```

El servidor queda disponible en:

```text
http://localhost:3000
```

Al iniciar correctamente se muestra:

```text
Servidor funcionando en http://localhost:3000
```

Además, al inicializar Sequelize se verifica la conexión con PostgreSQL.

---

# 11. Rutas principales

La aplicación cuenta con rutas para gestionar usuarios mediante operaciones CRUD.

| Método | Ruta                      | Funcionalidad                           |
| ------ | ------------------------- | --------------------------------------- |
| GET    | `/usuarios`               | Obtener usuarios                        |
| POST   | `/usuarios`               | Crear usuario                           |
| PUT    | `/usuarios/:id`           | Actualizar usuario                      |
| DELETE | `/usuarios/:id`           | Eliminar usuario                        |
| POST   | `/usuarios/transaccion`   | Crear usuario y registrar historial     |
| GET    | `/usuarios-orm`           | Obtener usuarios mediante Sequelize     |
| GET    | `/usuarios-orm-historial` | Obtener usuarios junto con su historial |
| GET    | `/`                       | Página principal                        |
| GET    | `/status`                 | Comprobar estado del servidor           |

---

# 12. Obtención de usuarios

La ruta:

```text
GET /usuarios
```

permite obtener los usuarios almacenados en PostgreSQL.

La consulta se realiza mediante `pg` utilizando SQL tradicional:

```sql
SELECT id, nombre, email
FROM usuarios
ORDER BY id
```

Los resultados se procesan antes de ser enviados como respuesta JSON.

Ejemplo de respuesta:

```json
[
  {
    "id": 1,
    "nombre": "María",
    "email": "maria@gmail.com"
  }
]
```

La consulta devuelve únicamente los campos necesarios para evitar exponer información que no corresponda a la respuesta.

---

# 13. Creación de usuarios

La ruta:

```text
POST /usuarios
```

permite crear un nuevo usuario.

Los datos se reciben mediante el cuerpo de la solicitud:

```json
{
  "nombre": "Nuevo Usuario",
  "email": "usuario@gmail.com"
}
```

Antes de ejecutar la consulta se valida que tanto `nombre` como `email` hayan sido enviados.

Si falta alguno de estos campos, se devuelve:

```text
400 Bad Request
```

Si la operación es correcta, se devuelve:

```text
201 Created
```

junto con los datos del usuario creado.

---

# 14. Actualización de usuarios

La ruta:

```text
PUT /usuarios/:id
```

permite actualizar un usuario existente.

Los datos modificados son:

* `nombre`
* `email`

Ejemplo:

```text
PUT /usuarios/1
```

con:

```json
{
  "nombre": "María Actualizada",
  "email": "maria.nueva@gmail.com"
}
```

Antes de realizar la actualización se validan los datos recibidos.

También se comprueba si el usuario existe.

Si el ID no corresponde a ningún registro, se devuelve:

```text
404 Not Found
```

Si la operación es correcta, se devuelve un mensaje confirmando la actualización.

---

# 15. Eliminación de usuarios

La ruta:

```text
DELETE /usuarios/:id
```

permite eliminar un usuario.

Antes de ejecutar el `DELETE`, la aplicación consulta si el usuario existe.

Esto permite evitar eliminar registros inexistentes y entregar una respuesta adecuada al cliente.

Si el usuario no existe:

```text
404 Not Found
```

Si existe y se elimina correctamente:

```text
Usuario eliminado correctamente
```

---

# 16. Validaciones y manejo de errores

El proyecto incorpora validaciones básicas en las operaciones de base de datos.

Entre ellas:

* Validación de campos obligatorios.
* Comprobación de existencia de usuarios.
* Manejo de errores de conexión.
* Manejo de errores de consultas SQL.
* Respuestas HTTP diferenciadas según el problema.

Se utilizan códigos de estado como:

```text
201 — Recurso creado
400 — Datos incorrectos o incompletos
404 — Recurso no encontrado
500 — Error interno del servidor
```

Los errores también se registran en la consola para facilitar la identificación de problemas durante el desarrollo.

---

# 17. Transaccionalidad

Una de las funcionalidades implementadas en el proyecto corresponde al manejo de transacciones.

La ruta:

```text
POST /usuarios/transaccion
```

realiza dos operaciones relacionadas:

1. Crear un nuevo usuario.
2. Registrar la acción en la tabla `historial`.

Estas operaciones deben mantenerse consistentes. Por esta razón se utiliza una transacción de PostgreSQL.

El flujo implementado es:

```text
BEGIN
   ↓
Crear usuario
   ↓
Registrar historial
   ↓
COMMIT
```

Si ocurre algún error:

```text
BEGIN
   ↓
Crear usuario
   ↓
Error
   ↓
ROLLBACK
```

La aplicación utiliza:

```sql
BEGIN
```

para iniciar la transacción,

```sql
COMMIT
```

para confirmar las operaciones y:

```sql
ROLLBACK
```

para deshacer los cambios cuando ocurre un error.

Finalmente, la conexión utilizada por la transacción se libera mediante:

```javascript
client.release();
```

Esto permite mantener la consistencia de los datos y evitar que una operación quede parcialmente ejecutada.

---

# 18. Sequelize ORM

Además del cliente `pg`, el proyecto incorpora **Sequelize** como ORM.

La configuración se encuentra en:

```text
sequelize.js
```

Sequelize permite trabajar con la base de datos utilizando modelos y métodos de JavaScript, reduciendo la necesidad de escribir consultas SQL directamente para determinadas operaciones.

La conexión se realiza utilizando:

```javascript
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false
  }
);
```

La conexión se verifica mediante:

```javascript
sequelize.authenticate()
```

Cuando la conexión es correcta se muestra:

```text
✅ Conexión exitosa con Sequelize
```

---

# 19. Modelo Usuario

El modelo:

```text
models/Usuario.js
```

representa la tabla:

```text
usuarios
```

El modelo contiene los siguientes atributos:

| Campo    | Tipo    | Característica                  |
| -------- | ------- | ------------------------------- |
| `id`     | INTEGER | Clave primaria, autoincremental |
| `nombre` | STRING  | Obligatorio                     |
| `email`  | STRING  | Obligatorio                     |

El modelo se configura con:

```javascript
tableName: "usuarios"
```

y:

```javascript
timestamps: false
```

Esto permite que Sequelize trabaje directamente con la estructura existente de la tabla.

---

# 20. Modelo Historial

El modelo:

```text
models/historial.js
```

representa la tabla:

```text
historial
```

Sus principales campos son:

| Campo        | Tipo    | Característica                  |
| ------------ | ------- | ------------------------------- |
| `id`         | INTEGER | Clave primaria, autoincremental |
| `usuario_id` | INTEGER | Relación con usuario            |
| `accion`     | STRING  | Acción registrada               |
| `fecha`      | DATE    | Fecha del registro              |

El campo `fecha` utiliza como valor predeterminado la fecha y hora actual:

```javascript
defaultValue: DataTypes.NOW
```

---

# 21. Relación entre Usuario e Historial

Se implementó una relación de tipo **uno a muchos (1:N)**.

Un usuario puede tener múltiples registros en su historial.

La relación se define mediante:

```javascript
Usuario.hasMany(Historial, {
  foreignKey: "usuario_id"
});
```

Y en sentido inverso:

```javascript
Historial.belongsTo(Usuario, {
  foreignKey: "usuario_id"
});
```

La clave utilizada para relacionar ambas entidades es:

```text
usuario_id
```

La relación puede representarse de la siguiente manera:

```text
Usuario
   │
   │ 1
   │
   └────────── N
              │
           Historial
```

De esta forma, un usuario puede tener uno o varios registros asociados en la tabla `historial`.

---

# 22. Consulta ORM de usuarios

Se creó la ruta:

```text
GET /usuarios-orm
```

Esta ruta obtiene los usuarios utilizando Sequelize:

```javascript
const usuarios = await Usuario.findAll();
```

A diferencia de `/usuarios`, donde se utiliza una consulta SQL mediante `pg`, esta ruta utiliza directamente el modelo `Usuario`.

Esto permite comparar ambas formas de acceso a los datos:

```text
SQL tradicional → pg
ORM → Sequelize
```

---

# 23. Consulta de usuarios con historial

Para consultar la relación entre usuarios e historial se creó la ruta:

```text
GET /usuarios-orm-historial
```

Esta consulta utiliza `include`:

```javascript
const usuarios = await Usuario.findAll({
  include: {
    model: Historial,
    attributes: ["id", "accion", "fecha"]
  }
});
```

El uso de `include` permite obtener los usuarios junto con sus registros relacionados en una sola consulta ORM.

La respuesta contiene información anidada, por ejemplo:

```json
[
  {
    "id": 1,
    "nombre": "Carlos",
    "email": "carlos@gmail.com",
    "Historials": [
      {
        "id": 1,
        "accion": "Usuario creado",
        "fecha": "2026-..."
      }
    ]
  }
]
```

Esta implementación permite demostrar el uso de relaciones entre modelos y cumple con el requerimiento de utilizar `include` para recuperar información relacionada.

---

# 24. Interfaz web

La aplicación también cuenta con una interfaz HTML ubicada en:

```text
public/index.html
```

La página presenta una tabla con:

* ID del usuario.
* Nombre.
* Email.
* Historial asociado.

Los datos se obtienen dinámicamente desde:

```text
/usuarios-orm-historial
```

mediante JavaScript y `fetch()`.

El contenido recibido desde el backend se procesa y se incorpora dinámicamente a la tabla HTML.

Cuando un usuario no posee registros en su historial, la interfaz muestra:

```text
Sin historial
```

---

# 25. Estilos de la aplicación

Los estilos se encuentran en:

```text
public/style.css
```

Se implementó CSS personalizado para:

* Organizar el contenido.
* Diseñar la tabla.
* Mejorar la presentación de usuarios.
* Diferenciar el historial.
* Mostrar las fechas.
* Incorporar efectos visuales.
* Adaptar la interfaz a distintos tamaños de pantalla.

No se utilizó un framework CSS en esta etapa.

---

# 26. Persistencia mediante archivo

Como parte de la funcionalidad heredada de la etapa anterior, la aplicación mantiene persistencia básica mediante el archivo:

```text
log.txt
```

El servidor utiliza el módulo `fs` de Node.js para registrar las visitas realizadas a:

```text
/status
```

La función `registrarVisita()` utiliza:

```javascript
fs.appendFile()
```

para agregar nuevos registros sin eliminar los anteriores.

Cada registro almacena:

* Fecha.
* Hora.
* Ruta visitada.

Ejemplo:

```text
21-08-2026 - 10:47:08 p. m. - /status
```

---

# 27. Ruta de estado del servidor

La ruta:

```text
GET /status
```

permite comprobar que el servidor se encuentra funcionando.

La respuesta tiene formato JSON:

```json
{
  "estado": "Servidor funcionando correctamente",
  "puerto": 3000
}
```

Además, cada acceso a esta ruta genera un registro en `log.txt`.

---

# 28. Comparación entre SQL tradicional y ORM

Durante el desarrollo se utilizaron dos estrategias de acceso a PostgreSQL.

### Cliente `pg`

Se utiliza para las operaciones CRUD y la transacción:

```text
GET /usuarios
POST /usuarios
PUT /usuarios/:id
DELETE /usuarios/:id
POST /usuarios/transaccion
```

Esta alternativa permite trabajar directamente con SQL y tener un control explícito sobre las consultas y transacciones.

### Sequelize ORM

Se utiliza para:

```text
/usuarios-orm
/usuarios-orm-historial
```

También permite definir los modelos:

```text
Usuario
Historial
```

y sus relaciones.

### Comparación

| Característica                | `pg` | Sequelize                           |
| ----------------------------- | ---- | ----------------------------------- |
| Consultas SQL directas        | ✅    | No es el enfoque principal          |
| CRUD implementado             | ✅    | Complementario                      |
| Transacciones SQL             | ✅    | No utilizado en esta implementación |
| Modelos                       | ❌    | ✅                                   |
| Relaciones entre modelos      | ❌    | ✅                                   |
| `include`                     | ❌    | ✅                                   |
| Consultas mediante métodos JS | ❌    | ✅                                   |

La utilización de ambas herramientas permite complementar el acceso tradicional a PostgreSQL con una herramienta de abstracción ORM.

---

# 29. Pruebas realizadas

Durante el desarrollo se realizaron pruebas utilizando:

* Postman.
* PostgreSQL.
* pgAdmin 4.
* Navegador web.
* Terminal de Node.js.

Se verificaron, entre otras, las siguientes funcionalidades:

### Servidor

```text
Servidor funcionando en http://localhost:3000
```

### PostgreSQL

```text
✅ Conexión exitosa a PostgreSQL
```

### Sequelize

```text
✅ Conexión exitosa con Sequelize
```

### Consulta ORM

Se comprobó el funcionamiento de:

```text
GET /usuarios-orm
```

### Relación ORM

Se comprobó:

```text
GET /usuarios-orm-historial
```

obteniendo usuarios junto con sus registros de historial.

También se realizaron pruebas sobre las operaciones CRUD y la transacción de creación de usuario con historial.

---

# 30. Flujo general de la aplicación

El funcionamiento general puede representarse de la siguiente manera:

```text
                    CLIENTE
                       │
                       ▼
                  EXPRESS.JS
                       │
          ┌────────────┴────────────┐
          │                         │
          ▼                         ▼
   Rutas CRUD                 Rutas ORM
          │                         │
          ▼                         ▼
   Controller                 Sequelize
          │                         │
          ▼                         ▼
         pg                  Modelos ORM
          │                         │
          └────────────┬────────────┘
                       │
                       ▼
                  PostgreSQL
                       │
              ┌────────┴────────┐
              │                 │
              ▼                 ▼
           usuarios          historial
```

La interfaz HTML consume la ruta ORM que incluye la información relacionada:

```text
HTML
  │
  ▼
fetch()
  │
  ▼
/usuarios-orm-historial
  │
  ▼
Sequelize + include
  │
  ▼
Usuarios + Historial
```

---

# 31. Buenas prácticas aplicadas

Durante el desarrollo se aplicaron diferentes prácticas para mantener el proyecto organizado:

* Separación de rutas y controladores.
* Separación de modelos Sequelize.
* Uso de variables de entorno para credenciales.
* Validación de datos de entrada.
* Manejo de errores mediante `try/catch`.
* Uso de códigos de estado HTTP.
* Validación de existencia antes de eliminar registros.
* Uso de consultas parametrizadas para evitar insertar directamente valores recibidos desde el cliente en las consultas SQL.
* Uso de transacciones para operaciones relacionadas.
* Liberación de conexiones utilizadas en las transacciones.
* Separación entre acceso SQL tradicional y acceso mediante ORM.
* Organización de archivos por responsabilidad.

---

# 32. Aprendizajes del Proyecto 7

El desarrollo de este proyecto permitió profundizar en conceptos fundamentales del backend con Node.js.

Entre los principales aprendizajes se encuentran:

* Conectar una aplicación Node.js con PostgreSQL.
* Utilizar el cliente `pg`.
* Trabajar con consultas SQL desde Node.js.
* Implementar un CRUD completo.
* Validar datos recibidos mediante solicitudes HTTP.
* Manejar errores en operaciones de base de datos.
* Comprender el funcionamiento de las transacciones.
* Aplicar `BEGIN`, `COMMIT` y `ROLLBACK`.
* Incorporar Sequelize como ORM.
* Crear modelos utilizando `DataTypes`.
* Establecer relaciones entre modelos.
* Utilizar `hasMany()` y `belongsTo()`.
* Consultar relaciones mediante `include`.
* Combinar backend y frontend mediante `fetch()`.
* Mostrar información relacionada dinámicamente en HTML.
* Organizar una aplicación backend mediante rutas, controladores y modelos.

---

# 33. Conclusión

El Proyecto 7 representa la evolución de la aplicación Node & Express desarrollada en la etapa anterior, incorporando una capa de persistencia real mediante PostgreSQL.

La aplicación actualmente permite gestionar usuarios mediante operaciones CRUD, realizar operaciones transaccionales y trabajar con modelos relacionados mediante Sequelize.

La incorporación simultánea de `pg` y Sequelize permite comprender tanto el acceso directo mediante SQL como el uso de un ORM para abstraer la interacción con la base de datos.

La relación entre `Usuario` e `Historial`, junto con el uso de `include`, permite obtener información relacionada desde el backend y presentarla posteriormente en una interfaz HTML.

Con esta implementación, el backend queda preparado para continuar evolucionando en etapas posteriores del proyecto.

---

# 34. Comandos principales

### Instalar dependencias

```bash
npm install
```

### Ejecutar en modo normal

```bash
npm start
```

### Ejecutar en modo desarrollo

```bash
npm run dev
```

### Probar Sequelize

```bash
node prueba-sequelize.js
```

### Servidor

```text
http://localhost:3000
```

### Estado del servidor

```text
http://localhost:3000/status
```

---

# 35. Autor

**María Magdalena Retamales**

Proyecto desarrollado como parte del programa de formación **Full Stack JavaScript**.

**Tecnologías principales:** Node.js · Express.js · PostgreSQL · pg · Sequelize · HTML · CSS · JavaScript
# Proyecto Integrador — Node.js, Express y PostgreSQL

## Entregas 6, 7 y 8

Aplicación web desarrollada progresivamente durante las entregas correspondientes a los módulos 6, 7 y 8, incorporando conceptos de desarrollo backend con **Node.js y Express**, persistencia de datos con **PostgreSQL**, construcción de una **API RESTful**, operaciones CRUD, transacciones, Sequelize ORM, relaciones entre entidades, autenticación mediante JWT, protección de rutas, validación y carga de archivos.

El proyecto fue construido de manera incremental, incorporando nuevas funcionalidades y mejoras en cada entrega.

---

# 1. Objetivo del proyecto

El objetivo del proyecto es desarrollar una aplicación web utilizando tecnologías modernas de JavaScript para backend, incorporando progresivamente:

* Desarrollo de aplicaciones con Node.js.
* Creación de servidores con Express.
* Construcción de una API RESTful.
* Persistencia de información.
* Conexión con PostgreSQL.
* Operaciones CRUD.
* Validación y manejo de errores.
* Uso de transacciones.
* Implementación de Sequelize ORM.
* Modelado de entidades y relaciones.
* Autenticación mediante JWT.
* Protección de rutas.
* Manejo seguro de contraseñas.
* Recuperación y cambio de contraseña.
* Carga y validación de archivos.
* Desarrollo de una interfaz web.
* Organización del código mediante controladores, rutas, modelos, middlewares y servicios.

---

# 2. Tecnologías utilizadas

## Backend

* Node.js
* Express
* JavaScript
* CommonJS

## Base de datos

* PostgreSQL
* pg
* Sequelize ORM
* pgAdmin

## Seguridad

* JSON Web Token (JWT)
* bcryptjs
* Middleware de autenticación

## Archivos y servicios

* Multer
* Nodemailer

## Frontend

* HTML5
* CSS3
* JavaScript

## Herramientas de desarrollo

* Visual Studio Code
* Git Bash
* Postman
* Nodemon
* PostgreSQL
* pgAdmin

---

# 3. Entregas del proyecto

El desarrollo se realizó de forma progresiva durante tres entregas.

```text
Entrega 6
    ↓
Desarrollo inicial de la aplicación
    ↓
Entrega 7
    ↓
API REST, PostgreSQL, CRUD,
transacciones y Sequelize
    ↓
Entrega 8
    ↓
Autenticación JWT, rutas protegidas,
relaciones ORM, carga de archivos
y funcionalidades complementarias
```

Cada entrega permitió ampliar la aplicación y aplicar nuevos conceptos sobre la base del trabajo desarrollado anteriormente.

---

# 4. Requisitos previos

Para ejecutar el proyecto se requiere tener instalado:

* Node.js
* npm
* PostgreSQL
* pgAdmin
* Git Bash o una terminal compatible
* Visual Studio Code

---

# 5. Instalación

Ingresar al directorio del proyecto:

```bash
cd "Proyecto-Node-Express-Web-App-M8 (Tercera entrega)"
```

Instalar las dependencias:

```bash
npm install
```

---

# 6. Dependencias principales

Las principales dependencias utilizadas son:

```text
bcryptjs
dotenv
express
jsonwebtoken
multer
nodemailer
pg
sequelize
```

Para desarrollo:

```text
nodemon
```

Las versiones utilizadas se encuentran registradas en:

```text
package.json
package-lock.json
```

---

# 7. Configuración de variables de entorno

El proyecto utiliza variables de entorno para evitar exponer directamente información sensible.

Archivo:

```text
.env
```

Ejemplo de estructura:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=proyecto7
DB_USER=postgres
DB_PASSWORD=tu_password

JWT_SECRET=tu_clave_secreta
```

Los valores reales de las credenciales deben mantenerse privados.

El archivo `.env` se encuentra excluido mediante `.gitignore`.

---

# 8. Base de datos

La aplicación utiliza:

```text
PostgreSQL
```

La base de datos utilizada durante el desarrollo es:

```text
proyecto7
```

La conexión mediante Sequelize se configura en:

```text
sequelize.js
```

También se dispone de:

```text
db.js
```

para las operaciones realizadas directamente mediante PostgreSQL.

---

# 9. Estructura del proyecto

La estructura principal es:

```text
Proyecto-Node-Express-Web-App-M8
│
├── controllers/
│   ├── auth.controller.js
│   ├── historial.controller.js
│   └── usuarios.controller.js
│
├── middlewares/
│   └── auth.middleware.js
│
├── models/
│   ├── asociaciones.js
│   ├── historial.js
│   ├── Perfil.js
│   ├── Rol.js
│   ├── Usuario.js
│   └── UsuarioRol.js
│
├── public/
│   ├── index.html
│   ├── login.html
│   ├── nueva-contrasena.html
│   ├── recuperar.html
│   ├── registro.html
│   └── style.css
│
├── routes/
│   ├── auth.routes.js
│   ├── historial.routes.js
│   ├── perfil.routes.js
│   ├── upload.routes.js
│   ├── usuarios.orm.routes.js
│   └── usuarios.routes.js
│
├── services/
│   └── email.service.js
│
├── uploads/
│
├── .env
├── .gitignore
├── db.js
├── index.js
├── log.txt
├── package.json
├── package-lock.json
├── probar-email.js
├── prueba-sequelize.js
└── sequelize.js
```

---

# 10. Configuración de Express

El archivo principal de la aplicación es:

```text
index.js
```

En este archivo se configura el servidor Express, las rutas principales, los archivos estáticos y la conexión con los componentes de persistencia.

---

# 11. Ejecución del proyecto

Para ejecutar la aplicación en modo desarrollo:

```bash
npm run dev
```

También puede ejecutarse mediante:

```bash
npm start
```

Durante el desarrollo se utiliza Nodemon para reiniciar automáticamente el servidor cuando se modifican los archivos.

La aplicación se ejecuta localmente en:

```text
localhost:3000
```

---

# 12. API REST

La aplicación implementa una API RESTful para administrar usuarios.

Principales endpoints:

| Método | Endpoint                | Función                            |
| ------ | ----------------------- | ---------------------------------- |
| GET    | `/usuarios`             | Obtener usuarios                   |
| POST   | `/usuarios`             | Crear usuario                      |
| PUT    | `/usuarios/:id`         | Actualizar usuario                 |
| DELETE | `/usuarios/:id`         | Eliminar usuario                   |
| POST   | `/usuarios/transaccion` | Crear usuario mediante transacción |

---

# 13. Obtener usuarios

Endpoint:

```text
GET /usuarios
```

Permite obtener los usuarios registrados.

La respuesta utiliza una estructura:

```json
{
  "status": 200,
  "message": "Usuarios obtenidos correctamente",
  "data": []
}
```

---

# 14. Crear usuarios

Endpoint:

```text
POST /usuarios
```

Permite registrar nuevos usuarios.

Ejemplo:

```json
{
  "nombre": "María",
  "email": "maria@example.com"
}
```

Cuando corresponde al proceso de autenticación, también se utiliza el campo:

```text
password
```

La respuesta utiliza una estructura JSON con:

```text
status
message
data
```

---

# 15. Actualizar usuarios

Endpoint:

```text
PUT /usuarios/:id
```

Permite actualizar información de un usuario existente.

Ejemplo:

```text
PUT /usuarios/19
```

La funcionalidad fue verificada mediante Postman.

---

# 16. Eliminar usuarios

Endpoint:

```text
DELETE /usuarios/:id
```

Permite eliminar un usuario mediante su identificador.

Ejemplo:

```text
DELETE /usuarios/19
```

La funcionalidad fue verificada mediante Postman.

---

# 17. Filtrado de usuarios

La API permite realizar consultas utilizando parámetros.

Ejemplo:

```text
GET /usuarios?nombre=María
```

Este mecanismo permite filtrar los resultados utilizando el nombre del usuario.

La funcionalidad fue comprobada mediante Postman.

---

# 18. Validación y manejo de errores

La aplicación incorpora validaciones para solicitudes incorrectas.

Las respuestas de error utilizan una estructura organizada:

```json
{
  "status": 400,
  "message": "Mensaje del error",
  "data": null
}
```

Durante las pruebas se verificaron solicitudes con información inválida para comprobar el comportamiento de la API.

---

# 19. Transacciones

El proyecto incorpora operaciones transaccionales mediante PostgreSQL.

La ruta correspondiente es:

```text
POST /usuarios/transaccion
```

Las transacciones permiten mantener la integridad de los datos, confirmando los cambios cuando la operación se completa correctamente y realizando rollback cuando ocurre un error.

---

# 20. Sequelize ORM

Sequelize se utiliza como ORM para trabajar con PostgreSQL mediante modelos JavaScript.

La configuración se encuentra en:

```text
sequelize.js
```

Los modelos se encuentran en:

```text
models/
```

Los principales modelos son:

```text
Usuario.js
Historial.js
Perfil.js
Rol.js
UsuarioRol.js
```

---

# 21. Modelo Usuario

El modelo `Usuario` representa la tabla:

```text
usuarios
```

Sus principales campos son:

```text
id
nombre
email
password
```

La definición utiliza Sequelize y se encuentra en:

```text
models/Usuario.js
```

---

# 22. Modelo Historial

El modelo:

```text
models/historial.js
```

representa información de historial asociada a usuarios.

Entre sus campos se encuentran:

```text
usuario_id
accion
fecha
```

---

# 23. Relación 1:N — Usuario e Historial

Se implementó una relación uno a muchos:

```text
Usuario 1 ───── N Historial
```

Un usuario puede tener múltiples registros de historial.

La relación se configura en:

```text
models/asociaciones.js
```

mediante:

```javascript
Usuario.hasMany(Historial, {
  foreignKey: "usuario_id"
});

Historial.belongsTo(Usuario, {
  foreignKey: "usuario_id"
});
```

---

# 24. Modelo Perfil

Se incorporó el modelo:

```text
Perfil.js
```

para representar información adicional asociada al usuario.

La relación implementada es:

```text
Usuario 1 ───── 1 Perfil
```

Se configura mediante:

```javascript
Usuario.hasOne(Perfil, {
  foreignKey: "usuario_id"
});

Perfil.belongsTo(Usuario, {
  foreignKey: "usuario_id"
});
```

---

# 25. Relación 1:1 — Usuario y Perfil

La relación uno a uno permite asociar un perfil a un usuario.

Esta implementación demuestra el uso de:

```text
hasOne
belongsTo
```

en Sequelize.

---

# 26. Modelo Rol

El proyecto incorpora:

```text
Rol.js
```

para representar los roles de la aplicación.

La tabla correspondiente es:

```text
rol
```

El campo principal corresponde al nombre del rol.

---

# 27. Relación N:M — Usuario y Rol

Se implementó una relación muchos a muchos:

```text
Usuario N ───── M Rol
```

Para esta relación se utiliza:

```text
UsuarioRol.js
```

como tabla/modelo intermedio.

Las asociaciones se configuran mediante:

```javascript
Usuario.belongsToMany(Rol, {
  through: UsuarioRol,
  foreignKey: "usuario_id",
  otherKey: "rol_id"
});

Rol.belongsToMany(Usuario, {
  through: UsuarioRol,
  foreignKey: "rol_id",
  otherKey: "usuario_id"
});
```

---

# 28. Asociaciones Sequelize

Las relaciones principales se centralizan en:

```text
models/asociaciones.js
```

Actualmente se encuentran implementadas:

```text
Usuario → Historial    1:N
Usuario → Perfil       1:1
Usuario → Rol          N:M
```

---

# 29. Autenticación JWT

La aplicación incorpora autenticación mediante:

```text
JSON Web Token (JWT)
```

La implementación utiliza:

```text
jsonwebtoken
```

El flujo general es:

```text
Credenciales
     ↓
   Login
     ↓
Validación
     ↓
Generación JWT
     ↓
Token
     ↓
Ruta protegida
     ↓
Middleware
     ↓
Acceso autorizado
```

---

# 30. Login

El endpoint de autenticación es:

```text
POST /login
```

La lógica se encuentra en:

```text
controllers/auth.controller.js
```

Cuando las credenciales son válidas, se genera un token JWT para autenticar las solicitudes posteriores.

---

# 31. Middleware de autenticación

La validación del JWT se encuentra en:

```text
middlewares/auth.middleware.js
```

El middleware verifica el token antes de permitir el acceso a las rutas protegidas.

---

# 32. Ruta protegida de perfil

La aplicación incorpora:

```text
GET /perfil
```

Esta ruta requiere autenticación mediante JWT.

La ruta utiliza:

```javascript
verificarToken
```

como middleware.

Cuando el token es válido, se permite el acceso a la información protegida.

---

# 33. Ruta protegida de carga de archivos

La carga de archivos también requiere autenticación.

Endpoint:

```text
POST /upload
```

La ruta utiliza el middleware:

```text
verificarToken
```

antes de procesar el archivo.

De esta manera existen múltiples rutas protegidas mediante JWT.

---

# 34. Contraseñas y bcryptjs

Para el tratamiento de contraseñas se utiliza:

```text
bcryptjs
```

Las contraseñas son procesadas mediante hashing antes de ser almacenadas cuando se utiliza la funcionalidad de autenticación.

Esto evita almacenar directamente la contraseña original como información de autenticación.

---

# 35. Recuperación de contraseña

El sistema incorpora endpoints relacionados con la recuperación y modificación de credenciales:

```text
POST /recuperar
POST /cambiar-contrasena
```

Las rutas se encuentran definidas en:

```text
routes/auth.routes.js
```

y su lógica se encuentra en:

```text
controllers/auth.controller.js
```

El proyecto también dispone del servicio:

```text
services/email.service.js
```

para las funcionalidades relacionadas con correo electrónico.

---

# 36. Carga de archivos mediante Multer

La aplicación incorpora carga de archivos utilizando:

```text
Multer
```

La configuración se encuentra en:

```text
routes/upload.routes.js
```

Endpoint:

```text
POST /upload
```

Campo utilizado:

```text
archivo
```

---

# 37. Validación de archivos

La carga de archivos incorpora restricciones de seguridad.

Tipos permitidos:

```text
PDF
JPEG
PNG
```

Tamaño máximo:

```text
5 MB
```

Los archivos son almacenados en:

```text
uploads/
```

---

# 38. Manejo de errores de Multer

La aplicación contempla errores relacionados con la carga de archivos.

Por ejemplo:

* Archivos que superan los 5 MB.
* Tipos de archivo no permitidos.
* Errores producidos durante el procesamiento de la carga.

Las respuestas mantienen una estructura JSON organizada:

```json
{
  "status": 400,
  "message": "Descripción del error",
  "data": null
}
```

---

# 39. Interfaz web

La aplicación incorpora una interfaz web ubicada en:

```text
public/
```

Las principales páginas son:

```text
index.html
login.html
registro.html
recuperar.html
nueva-contrasena.html
```

La interfaz permite interactuar visualmente con las funcionalidades principales de la aplicación.

---

# 40. Estilos

Los estilos principales se encuentran centralizados en:

```text
public/style.css
```

Se utiliza CSS para estructurar y presentar los distintos elementos de la interfaz.

---

# 41. Servicio de correo electrónico

El proyecto dispone del servicio:

```text
services/email.service.js
```

Este servicio separa la lógica relacionada con el envío de correos electrónicos del resto de los controladores.

Esta organización permite mantener una separación de responsabilidades dentro del proyecto.

---

# 42. Persistencia mediante archivo

El proyecto conserva:

```text
log.txt
```

como parte de las funcionalidades de persistencia desarrolladas durante las entregas anteriores.

Este archivo forma parte de la evolución del proyecto y de los contenidos trabajados durante el desarrollo.

---

# 43. Comparación de acceso a datos

Durante el proyecto se trabajó con dos formas de acceso a PostgreSQL.

## PostgreSQL mediante pg

Permite ejecutar consultas SQL directamente.

Características:

* Control directo de las consultas.
* Uso explícito de SQL.
* Comunicación directa con PostgreSQL.

## Sequelize ORM

Permite trabajar mediante:

* Modelos.
* Métodos JavaScript.
* Asociaciones.
* Relaciones entre entidades.

El uso de ambas alternativas permite comprender las diferencias entre trabajar directamente con SQL y utilizar un ORM.

---

# 44. Organización del código

La aplicación utiliza una estructura basada en separación de responsabilidades.

### Controllers

Contienen la lógica de las operaciones.

```text
controllers/
```

### Routes

Definen los endpoints de la API.

```text
routes/
```

### Models

Representan las entidades y relaciones de la base de datos.

```text
models/
```

### Middlewares

Contienen funcionalidades que intervienen durante el procesamiento de las solicitudes.

```text
middlewares/
```

### Services

Contienen funcionalidades independientes y reutilizables.

```text
services/
```

### Public

Contiene los archivos correspondientes a la interfaz web.

```text
public/
```

---

# 45. Pruebas realizadas

Las funcionalidades principales fueron verificadas utilizando Postman.

Entre las pruebas realizadas se encuentran:

```text
GET /usuarios
POST /usuarios
PUT /usuarios/:id
DELETE /usuarios/:id
GET /usuarios?nombre=María
POST /login
GET /perfil sin token
GET /perfil con token
POST /upload
POST /upload con tipo no permitido
POST /usuarios con datos inválidos
```

Las pruebas contemplaron tanto respuestas exitosas como escenarios de error.

---

# 46. Evidencias del proyecto

Las funcionalidades fueron documentadas mediante evidencias visuales.

Las principales evidencias corresponden a:

```text
01_servidor_funcionando.png
02_login.png
03_aplicacion_funcionando.png
04_GET_usuarios.png
05_POST_crear_usuario.png
06_PUT_actualizar_usuario.png
07_DELETE_usuario.png
08_GET_filtro_nombre.png
09_POST_login_JWT.png
10_GET_perfil_sin_token.png
11_GET_perfil_con_token.png
12_POST_upload_archivo.png
13_UPLOAD_tipo_no_permitido.png
14_POST_validacion_error.png
```

Estas evidencias permiten demostrar:

* Funcionamiento del servidor.
* Funcionamiento de la interfaz.
* Operaciones CRUD.
* Filtrado.
* Autenticación JWT.
* Protección de rutas.
* Carga de archivos.
* Validación.
* Manejo de errores.

---

# 47. Flujo general de la aplicación

```text
                         USUARIO
                            │
                            ▼
                      INTERFAZ WEB
                            │
                            ▼
                      API EXPRESS
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
            CRUD          LOGIN         UPLOAD
              │             │             │
              │             ▼             │
              │            JWT             │
              │             │             │
              │             ▼             │
              │      RUTAS PROTEGIDAS     │
              │                           │
              └─────────────┬─────────────┘
                            ▼
                      SEQUELIZE ORM
                            │
                            ▼
                       POSTGRESQL
```

---

# 48. Flujo de autenticación

```text
1. Usuario ingresa sus credenciales.
2. Se envían mediante POST /login.
3. El servidor valida las credenciales.
4. Se genera un token JWT.
5. El cliente utiliza el token.
6. Se solicita una ruta protegida.
7. El middleware verifica el JWT.
8. Si es válido, se permite el acceso.
9. Si no es válido, la solicitud es rechazada.
```

---

# 49. Flujo de carga de archivos

```text
Cliente
   ↓
POST /upload
   ↓
Verificación JWT
   ↓
Multer
   ↓
Validación de tipo
   ↓
Validación de tamaño
   ↓
Guardado en uploads/
   ↓
Respuesta JSON
```

---

# 50. Buenas prácticas aplicadas

Durante el desarrollo se aplicaron diferentes prácticas de organización y seguridad:

* Separación de rutas y controladores.
* Uso de modelos Sequelize.
* Centralización de asociaciones.
* Uso de variables de entorno.
* Exclusión de `.env` mediante `.gitignore`.
* Uso de hashing para contraseñas.
* Protección de rutas mediante JWT.
* Validación de archivos.
* Límite de tamaño para archivos.
* Manejo estructurado de errores.
* Separación de responsabilidades.
* Organización del código por funcionalidades.
* Pruebas mediante Postman.

---

# 51. Aprendizajes

El desarrollo de las tres entregas permitió aplicar progresivamente conocimientos relacionados con:

* Node.js.
* Express.
* Arquitectura de aplicaciones backend.
* APIs RESTful.
* Métodos HTTP.
* PostgreSQL.
* Consultas y persistencia de datos.
* CRUD.
* Transacciones.
* Sequelize ORM.
* Relaciones entre modelos.
* Autenticación JWT.
* Middleware.
* Hashing de contraseñas.
* Carga de archivos.
* Validación.
* Manejo de errores.
* Organización modular del código.
* Integración entre frontend y backend.

---

# 52. Conclusión

El proyecto permitió desarrollar progresivamente una aplicación web utilizando Node.js, Express y PostgreSQL, incorporando diferentes funcionalidades a lo largo de las entregas 6, 7 y 8.

La aplicación evolucionó desde una estructura inicial hasta una solución que integra:

```text
Node.js
Express
PostgreSQL
API REST
CRUD
Transacciones
Sequelize ORM
Relaciones 1:1
Relaciones 1:N
Relaciones N:M
JWT
Middleware
bcryptjs
Multer
Nodemailer
Interfaz web
Validación
Manejo de errores
```

La implementación de estas funcionalidades permitió aplicar de manera práctica los conceptos abordados durante el desarrollo del proyecto.

---

# 53. Comandos principales

Instalar dependencias:

```bash
npm install
```

Ejecutar en desarrollo:

```bash
npm run dev
```

Ejecutar en modo normal:

```bash
npm start
```

---

# 54. Autor

**Magdalena Retamales**

Proyecto académico

**Chile — 2026**
