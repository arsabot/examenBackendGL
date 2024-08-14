# API de Gestión de Turnos "TuTurno.app" - Examen Fundacion integrar 

## Descripción ℹ️

Esta API permite gestionar turnos y usuarios en un sistema de gestión de turnos. Los administradores pueden obtener todos los usuarios y turnos, mientras que los usuarios normales solo pueden acceder a sus propios datos. La API está construida con Node.js, Express, y utiliza PostgreSQL con Prisma como ORM.
<br>
<br>
## 💫 Funcionalidades 🤩

- **Autenticación 🔐**: Permite a los usuarios registrarse, iniciar sesión y recibir tokens JWT para autenticar las solicitudes.
- **Gestión de Usuarios 👥👥**: Los administradores pueden obtener una lista de todos los usuarios y sus turnos asignados, tambien pueden eliminar un usuario por su ID.
- **Gestión de Turnos 📅**: Los usuarios pueden crear, ver y gestionar sus propios turnos. Los administradores tienen acceso completo a todos los turnos.
- **Autorización 🔓**: Los endpoints están protegidos y solo los usuarios con tokens válidos pueden acceder a ellos.


<br>

# 🚀 Clonar e Instalar Dependencias para Probar la API 🚀 

Sigue estos pasos para clonar el repositorio y configurar el entorno para probar la API.

## 1. Clonar el Repositorio

- Primero, clona el repositorio desde GitHub usando el siguiente comando:

```bash
git clone https://github.com/arsabot/examen-backend-GL
```
## 2. Ingresar a la carpeta

cd `examenBackendGL`

## 3. Instalar las dependencias (si no tienes npm)
- Asegúrate de tener [Node.js](https://nodejs.org/en/) y **npm** instalados. Si no tienes npm, puedes instalarlo siguiendo las instrucciones en su [sitio oficial](https://www.npmjs.com/).

- Instala las dependencias del proyecto ejecutando:
```npm install```
## 4. Configurar Variable de Entorno
## 5. ejecutar el servidor con el siguiente codigo:
```npm run dev```
## Uso de Thunder Client para Probar la API 🚀

Thunder Client es una extensión para Visual Studio Code que te permite hacer solicitudes HTTP y probar tus APIs de manera fácil y rápida. A continuación, te muestro cómo configurar y utilizar Thunder Client para probar nuestra API.

### Instalación de Thunder Client

1. Abre Visual Studio Code.
2. Ve a la pestaña de **Extensiones** (puedes usar el atajo de teclado `Ctrl+Shift+X` o `Cmd+Shift+X` en macOS).
3. Busca "Thunder Client" en la barra de búsqueda.
4. Instala la extensión **Thunder Client** desarrollada por **Ranginang**.

### Configuración de Thunder Client

1. Una vez instalada, abre la extensión desde la barra lateral izquierda de Visual Studio Code (el ícono de rayos).
2. Haz clic en el botón **New Request** para crear una nueva solicitud.
3. Configura tu solicitud con los siguientes detalles:
   - **Método:** Elige el método HTTP adecuado (GET, POST, PUT, DELETE, etc.).
   - **URL:** Introduce la URL de la API, por ejemplo, `http://localhost:3005/api/turnos`.
   - **Headers:** Si la API requiere autenticación, asegúrate de agregar los encabezados necesarios. Por ejemplo:
     - **Authorization:** `Bearer <YOUR_JWT_TOKEN>`
   - **Body:** Si estás haciendo una solicitud POST o PUT, configura el cuerpo de la solicitud en formato JSON.
  
     
# Crear un Usuario 🛠️👤

## Endpoint 🔗

- **Método:** `POST`
- **Ruta:** `http://localhost:3005/api/auth/createuser`

## Descripción ℹ️

Crea un nuevo usuario en el sistema.

## Requerimientos  🚩

- **Autenticación:** No se requiere autenticación para crear un nuevo usuario.

## Cuerpo de la Solicitud (Body)📄

El cuerpo de la solicitud debe ser un objeto JSON con los siguientes campos:

- **name** (string): Nombre del usuario. Debe ser una cadena de texto no vacía.
- **email** (string): Correo electrónico del usuario. Debe ser una cadena de texto con formato de correo electrónico válido.
- **password** (string): Contraseña del usuario. Debe ser una cadena de texto con al menos 6 caracteres.
- **isAdmin** (boolean): (Opcional) Indica si el usuario es administrador. El valor predeterminado es `false`.

### Ejemplo Cuerpo de Solicitud (Body)📄

```json
## Normal User ##

{
  "name": "Juan Sacachispas",
  "email": "juan.sacachispas@example.com",
  "password": "password123",
  "isAdmin": false
}


## Admin User ##

{
  "name": "Elsa Pato",
  "email": "elsa.pato@example.com",
  "password": "password123",
  "isAdmin": true
}
```
# Iniciar Sesión 👤📥

## Endpoint  🔗

- **Método:** `POST`
- **Ruta:** `http://localhost:3005/api/auth/login`

## Descripción ℹ️

Autentica a un usuario y genera un token de acceso JWT.

## Requerimientos  🚩

- **Autenticación:** No se requiere autenticación previa para iniciar sesión.

## Cuerpo de la Solicitud (Body)📄

El cuerpo de la solicitud debe ser un objeto JSON con los siguientes campos:

- **email** (string): Correo electrónico del usuario. Debe ser una cadena de texto con formato de correo electrónico válido.
- **password** (string): Contraseña del usuario. Debe ser una cadena de texto.

### Cuerpo de Solicitud

```json
{
  "email": "elsa.pato@example.com",
  "password": "password123"
}
```
# Obtener Usuario Autenticado 👤🔓

## Endpoint  🔗

- **Método:** `GET`
- **Ruta:** `http://localhost:3005/api/auth/getuser`

## Descripción ℹ️

Obtiene los detalles del usuario autenticado. Este endpoint devuelve la información del usuario actual basado en el token JWT proporcionado en los encabezados de la solicitud.

## Requerimientos  🚩

- **Autenticación:** Se requiere un token JWT válido en el encabezado de autorización. El token debe ser precedido por el prefijo `Bearer`.

## Ejemplo de Encabezados de la Solicitud (Headers) 🧠 

- **Authorization:** `Bearer <JWT_TOKEN>`



# Obtener Todos los Usuarios <br> 👤👤👤👤

## Endpoint  🔗

- **Método:** `GET`
- **Ruta:** `http://localhost:3005/api/auth/admin/users`

## Descripción ℹ️

Obtiene una lista de todos los usuarios en el sistema. Este endpoint está disponible solo para administradores.

## Requerimientos  🚩

- **Autenticación:** Se requiere un token JWT válido en el encabezado de autorización. El token debe ser precedido por el prefijo `Bearer`.
- **Autorización:** El usuario autenticado debe tener permisos de administrador (`isAdmin: true`).

## Encabezados de la Solicitud (Headers) 🧠 

- **Authorization:** `Bearer <JWT_TOKEN>`



# Obtener Todos los Usuarios con Turnos <br>👤📅 👤📆 👤📅

## Endpoint  🔗

- **Método:** `GET`
- **Ruta:** `http://localhost:3005/api/auth/usersWithTurno`

## Descripción ℹ️

Obtiene una lista de todos los usuarios en el sistema junto con sus turnos asignados. Este endpoint está disponible solo para administradores.

## Requerimientos  🚩

- **Autenticación:** Se requiere un token JWT válido en el encabezado de autorización. El token debe ser precedido por el prefijo `Bearer`.
- **Autorización:** El usuario autenticado debe tener permisos de administrador (`isAdmin: true`).

## Encabezados de la Solicitud (Headers) 🧠 

- **Authorization:** `Bearer <JWT_TOKEN>`

# 📅 Crear un Turno

## Endpoint  🔗

- **Método:** `POST`
- **Ruta:** `http://localhost:3005/api/turnos`

## Descripción ℹ️

Crea un nuevo turno en el sistema. Este endpoint está disponible solo para usuarios autenticados.

## Requerimientos 🚩

- **Autenticación:** Se requiere un token JWT válido en el encabezado de autorización. El token debe ser precedido por el prefijo `Bearer`.
- **Autorización:** El usuario autenticado debe estar autorizado para crear turnos.

## Encabezados de la Solicitud (Headers) 🧠 

- **Authorization:** `Bearer <JWT_TOKEN>`
- **Content-Type:** `application/json`

### Cuerpo de Solicitud (Body)📄


```json
    {
    "fname": "Elsa",
    "lname": "Pato",
    "email": "elsa.pato@example.com",
    "age": 30,
    "country": "USA",
    "address": "123 Elm Street",
    "city": "Springfield",
    "state": "IL",
    "dist": "Downtown",
    "pincode": "62704",
    "phone": "555-1234",
    "department": "Cardiology",
    "venue": "Springfield Hospital",
    "hospital": "Springfield Hospital",
    "date": "2024-08-15T00:00:00.000Z",
    "book_date": "2024-08-16T00:00:00.000Z",
    "time_slot": "09:00",
    "createdAt": "2024-08-14T00:00:00.000Z",
    "updatedAt": "2024-08-14T00:00:00.000Z"
  }

```
# Obtener Todos los Turnos 🙌 📅 📅 📅 
## Endpoint 🔗 
- **Método:** `GET`
- **Ruta:** `http://localhost:3005/api/turnos`
## Descripción ℹ️ 

Obtiene una lista de todos los turnos en el sistema. Este endpoint requiere autenticación.

## Requerimientos 🚩 
- **Autenticación:** Se requiere un token JWT válido en el encabezado de autorización. El token debe ser precedido por el prefijo `Bearer`.
## Encabezados de la Solicitud (Headers) 🧠 
- **Authorization:** `Bearer <JWT_TOKEN>`
### Ejemplo de Respuesta:
```json

  {
    "id": 1,
    "userId": 1,
    "fname": "John",
    "lname": "Doe",
    "email": "john.doe@example.com",
    "age": 30,
    "country": "USA",
    "address": "123 Elm Street",
    "city": "Springfield",
    "state": "IL",
    "dist": "Downtown",
    "pincode": "62704",
    "phone": "555-1234",
    "department": "Cardiology",
    "venue": "Springfield Hospital",
    "hospital": "Springfield Hospital",
    "date": "2024-08-15T00:00:00.000Z",
    "book_date": "2024-08-16T00:00:00.000Z",
    "time_slot": "09:00",
    "createdAt": "2024-08-14T00:00:00.000Z",
    "updatedAt": "2024-08-14T00:00:00.000Z"
  },
  // Otros turnos...
```
# Crear un Turno  ✍️ 📅 
## Endpoint
- **Método:** `POST`
- **Ruta:** `http://localhost:3005/api/turnos`
## Descripción ℹ️ 

Crea un nuevo turno en el sistema. Este endpoint requiere autenticación.

## Requerimientos 🚩 
- **Autenticación:** Se requiere un token JWT válido en el encabezado de autorización. El token debe ser precedido por el prefijo Bearer.
## Encabezados de la Solicitud (Headers) 🧠 
- **Authorization:** `Bearer <JWT_TOKEN>`
- **Content-Type:** `application/json`
## Ejemplo de Encabezado de Solicitud HTTP
- **Authorization:** `Bearer <JWT_TOKEN>`
- **Content-Type:** `application/json`
### Cuerpo de la Solicitud (Body) 📄 
```json
{
  "fname": "Elsa",
  "lname": "Pato",
  "email": "elsa.pato@example.com",
  "age": 30,
  "country": "USA",
  "address": "123 Elm Street",
  "city": "Springfield",
  "state": "IL",
  "dist": "Downtown",
  "pincode": "62704",
  "phone": "555-1234",
  "department": "Cardiology",
  "venue": "Springfield Hospital",
  "hospital": "Springfield Hospital",
  "date": "2024-08-15T00:00:00.000Z",
  "book_date": "2024-08-16T00:00:00.000Z",
  "time_slot": "09:00"
}
```
### Ejemplo de Respuesta
```json
{
  "id": 2,
  "userId": 1,
  "fname": "Elsa",
  "lname": "Pato",
  "email": "elsa.pato@example.com",
  "age": 30,
  "country": "USA",
  "address": "123 Elm Street",
  "city": "Springfield",
  "state": "IL",
  "dist": "Downtown",
  "pincode": "62704",
  "phone": "555-1234",
  "department": "Cardiology",
  "venue": "Springfield Hospital",
  "hospital": "Springfield Hospital",
  "date": "2024-08-15T00:00:00.000Z",
  "book_date": "2024-08-16T00:00:00.000Z",
  "time_slot": "09:00",
  "createdAt": "2024-08-14T00:00:00.000Z",
  "updatedAt": "2024-08-14T00:00:00.000Z"
}
```

# Actualizar un Turno ⬆️ 📅 

## Endpoint
- **Método:** `PUT`
- **Ruta:** `/api/turnos/:id`
- **Ejemplo:** `http://localhost:3005/api/turnos/2`

## Descripción ℹ️ 
Actualiza un turno existente en el sistema. Este endpoint requiere autenticación.

## Requerimientos 🚩 
- **Autenticación:** Se requiere un token JWT válido en el encabezado de autorización. El token debe ser precedido por el prefijo `Bearer`.

## Encabezados de la Solicitud (Headers) 🧠 
- **Authorization:** `Bearer <JWT_TOKEN>`
- **Content-Type:** `application/json`

## Parámetros de Ruta 🔢
- **id:** ID del turno que se desea actualizar.

## Cuerpo de la Solicitud (Body) 📄 
El cuerpo de la solicitud debe contener los campos a actualizar. Ejemplo:

```json
{
  "fname": "Elsa",
  "lname": "Pato",
  "email": "elsa.pato@example.com",
  "age": 31,
  "country": "USA",
  "address": "123 Elm Street",
  "city": "Springfield",
  "state": "IL",
  "dist": "Downtown",
  "pincode": "62704",
  "phone": "555-1234",
  "department": "Cardiology",
  "venue": "Springfield Hospital",
  "hospital": "Springfield Hospital",
  "date": "2024-08-15T00:00:00.000Z",
  "book_date": "2024-08-16T00:00:00.000Z",
  "time_slot": "10:00"
}
```
Ejemplo de Respuesta
```json
{
  "id": 2,
  "userId": 1,
  "fname": "Elsa",
  "lname": "Pato",
  "email": "elsa.pato@example.com",
  "age": 31,
  "country": "USA",
  "address": "123 Elm Street",
  "city": "Springfield",
  "state": "IL",
  "dist": "Downtown",
  "pincode": "62704",
  "phone": "555-1234",
  "department": "Cardiology",
  "venue": "Springfield Hospital",
  "hospital": "Springfield Hospital",
  "date": "2024-08-15T00:00:00.000Z",
  "book_date": "2024-08-16T00:00:00.000Z",
  "time_slot": "10:00",
  "createdAt": "2024-08-14T00:00:00.000Z",
  "updatedAt": "2024-08-14T00:00:00.000Z"
}
```
# Eliminar un Turno 🚫 📅 

## Endpoint 🔗 
- **Método:** `DELETE`
- **Ruta:** `/api/turnos/:id`
- **Ejemplo:** `http://localhost:3005/api/turnos/3`

## Descripción ℹ️ 
Elimina un turno existente en el sistema por su ID. Este endpoint requiere autenticación.

## Requerimientos 🚩 
- **Autenticación:** Se requiere un token JWT válido en el encabezado de autorización. El token debe ser precedido por el prefijo `Bearer`.

## Encabezados de la Solicitud (Headers) 🧠 
- **Authorization:** `Bearer <JWT_TOKEN>`

## Parámetros de Ruta 🔢
- **id:** ID del turno que se desea eliminar.

## Ejemplo de Solicitud HTTP
```http
DELETE /api/turnos/3
Authorization: Bearer <JWT_TOKEN>
```
# Eliminar un Usuario 🚫 👤

## Endpoint 🔗
- **Método:** `DELETE`
- **Ruta:** `/api/auth/admin/users/:id`
- **Ejemplo:** `http://localhost:3005/api/auth/admin/users/3`

## Descripción ℹ️
Elimina un usuario existente en el sistema por su ID. Este endpoint requiere autenticación y privilegios de administrador.

## Requerimientos 🚩
- **Autenticación:** Se requiere un token JWT válido en el encabezado de autorización. El token debe ser precedido por el prefijo `Bearer`.

## Encabezados de la Solicitud (Headers) 🧠
- **Authorization:** `Bearer <JWT_TOKEN>`

## Parámetros de Ruta 🔢
- **id:** ID del usuario que se desea eliminar.

## Respuesta
- **Código de Estado 200 OK:** Si el usuario ha sido eliminado exitosamente.
- **Código de Estado 404 Not Found:** Si el usuario no se encuentra.
- **Código de Estado 403 Forbidden:** Si el usuario no tiene privilegios de administrador.



# Encontrar un Usuario por ID 👤

## Endpoint 🔗
- **Método:** `GET`
- **Ruta:** `/api/auth/admin/user/:id`
- **Ejemplo:** `http://localhost:3005/api/auth/admin/user/3`

## Descripción ℹ️
Obtiene los detalles de un usuario existente en el sistema por su ID. Este endpoint requiere autenticación y privilegios de administrador.

## Requerimientos 🚩
- **Autenticación:** Se requiere un token JWT válido en el encabezado de autorización. El token debe ser precedido por el prefijo `Bearer`.

## Encabezados de la Solicitud (Headers) 🧠
- **Authorization:** `Bearer <JWT_TOKEN>`

## Parámetros de Ruta 🔢
- **id:** ID del usuario que se desea encontrar.

## Respuesta
- **Código de Estado 200 OK:** Si el usuario es encontrado.
- **Código de Estado 404 Not Found:** Si el usuario no se encuentra.
- **Código de Estado 403 Forbidden:** Si el usuario no tiene privilegios de administrador.


