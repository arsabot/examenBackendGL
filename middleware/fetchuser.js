import jwt from "jsonwebtoken";
import HTTP_STATUS from "../helpers/httpStatus.js";

const JWT_SECRET = process.env.JWT_SECRET;

const fetchUser = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("Token no proporcionado o formato incorrecto");
    return res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .send({ error: "Por favor, autentíquese con un Token válido" });
  }

  // elimina el prefijo 'Bearer ' del token
  const token = authHeader.replace("Bearer ", "");

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);

    req.user = decodedToken.user;
    next();
  } catch (error) {
    console.log("Error al verificar el token:", error.message);
    res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .send({
        error: "Token inválido. Por favor, autentíquese con un Token válido",
      });
  }
};

export default fetchUser;
