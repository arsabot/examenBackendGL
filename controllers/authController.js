import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import HTTP_STATUS from "../helpers/httpStatus.js";

const JWT_SECRET = process.env.JWT_SECRET;
const prisma = new PrismaClient();

// funcion para obtener detalles del usuario autenticado
const getUser = async (req, res) => {
  console.log(
    `Solicitud para obtener detalles del usuario con ID: ${req.user.id}`
  );

  try {
    const userId = parseInt(req.user.id, 10);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
      },
    });

    if (!user) {
      console.log(`Usuario con ID ${userId} no encontrado`);
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: "Usuario no encontrado" });
    }

    console.log(`Detalles del usuario recuperados: ${JSON.stringify(user)}`);
    res.status(HTTP_STATUS.OK).json(user);
  } catch (error) {
    console.error("Error al obtener detalles del usuario:", error.message);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .send("Error interno del servidor");
  }
};

// funcion para crear un nuevo usuario
const createUser = async (req, res) => {
  console.log("Solicitud para crear un nuevo usuario:", req.body);

  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ success, errors: errors.array() });
  }

  try {
    let user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    if (user) {
      console.log(
        `Ya existe un usuario con el correo electrónico ${req.body.email}`
      );
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success,
        error: "Lo sentimos, ya existe un usuario con este correo electrónico",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    user = await prisma.user.create({
      data: {
        name: req.body.name,
        password: secPass,
        email: req.body.email,
        isAdmin: req.body.isAdmin || false,
      },
    });

    const data = { user: { id: user.id, isAdmin: user.isAdmin } };
    const authtoken = jwt.sign(data, JWT_SECRET, { expiresIn: "1h", algorithm: "HS256" }); // Genera el token JWT
    success = true;
    console.log(`Usuario creado con ID: ${user.id}`);
    res.status(HTTP_STATUS.OK).json({ success, authtoken }); 
  } catch (error) {
    console.error("Error al crear el usuario:", error.message);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .send("Error interno del servidor");
  }
};

// funcion para autenticar un usuario existente
const loginUser = async (req, res) => {
  console.log(
    "Intento de inicio de sesión con correo electrónico:",
    req.body.email
  );

  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ success, errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      console.log(`Usuario con correo electrónico ${email} no encontrado`);
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success,
        error: "Por favor, intente ingresar con credenciales válidas",
      });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      console.log("Contraseña inválida");
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success,
        error: "Por favor, intente ingresar con credenciales válidas",
      });
    }

    const data = { user: { id: user.id, isAdmin: user.isAdmin } };
    const authtoken = jwt.sign(data, JWT_SECRET, { expiresIn: "1h", algorithm: "HS256" }); // Genera el token JWT
    success = true;
    console.log(`Usuario autenticado con ID: ${user.id}`);
    res.status(HTTP_STATUS.OK).json({ success, authtoken });
  } catch (error) {
    console.error("Error al autenticar el usuario:", error.message);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .send("Error interno del servidor");
  }
};

// funcion para obtener todos los usuarios (solo si es admin)
const getAllUsers = async (req, res) => {
  console.log("Solicitud para obtener todos los usuarios");

  try {
    if (!req.user.isAdmin) {
      console.log("Acceso denegado: el usuario no es administrador");
      return res
        .status(HTTP_STATUS.FORBIDDEN)
        .json({ message: "Acceso denegado" });
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
      },
    });

    console.log(`Usuarios recuperados: ${JSON.stringify(users)}`);
    res.status(HTTP_STATUS.OK).json(users);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error.message);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .send("Error interno del servidor");
  }
};

// funcion para obtener todos los usuarios con turnos (solo admins)
const getAllUsersWithTurnos = async (req, res) => {
  console.log("Solicitud para obtener todos los usuarios con turnos");

  try {
    if (!req.user || !req.user.isAdmin) {
      console.log("Acceso denegado: el usuario no es administrador");
      return res.status(HTTP_STATUS.FORBIDDEN).send({
        error:
          "Acceso denegado. Solo los administradores pueden acceder a esta ruta.",
      });
    }

    const users = await prisma.user.findMany({
      include: {
        turnos: true,
      },
    });
    // funcion para eliminar el campo password de cada usuario y no lo muestre al admin
    const usersWithoutPassword = users.map(({ password, ...user }) => user);
    console.log(
      `Usuarios con turnos recuperados: ${JSON.stringify(usersWithoutPassword)}`
    );
    res.status(HTTP_STATUS.OK).json(usersWithoutPassword);
  } catch (error) {
    console.error("Error al obtener usuarios con turnos:", error.message);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .send("Error interno del servidor");
  }
};
// funcion para obtener un usuario por ID (solo si es admin)
const getUserById = async (req, res) => {
  console.log("Solicitud para obtener un usuario con ID:", req.params.id);

  try {
    if (!req.user.isAdmin) {
      console.log("Acceso denegado: el usuario no es administrador");
      return res
        .status(HTTP_STATUS.FORBIDDEN)
        .json({ message: "Acceso denegado" });
    }

    const userId = parseInt(req.params.id, 10);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
      },
    });

    if (!user) {
      console.log(`Usuario con ID ${userId} no encontrado`);
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: "Usuario no encontrado" });
    }

    console.log(`Detalles del usuario recuperados: ${JSON.stringify(user)}`);
    res.status(HTTP_STATUS.OK).json(user);
  } catch (error) {
    console.error("Error al obtener el usuario:", error.message);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .send("Error interno del servidor");
  }
};
// funcion para eliminar un usuario (solo admin)
const deleteUser = async (req, res) => {
  console.log("Solicitud para eliminar el usuario con ID:", req.params.id);

  try {
    const userId = parseInt(req.params.id, 10);

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      console.log(`Usuario con ID ${userId} no encontrado`);
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "Usuario no encontrado",
      });
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    console.log(`Usuario con ID ${userId} eliminado`);
    res.status(HTTP_STATUS.OK).json({
      message: "Usuario eliminado con éxito",
    });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error.message);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .send("Error interno del servidor");
  }
};

export default {
  getUser,
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  getAllUsersWithTurnos,
  deleteUser,
};
