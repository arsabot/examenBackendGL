import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import turnosRouter from "./routes/turnosRouter.js";

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 3005;

app.use(cors()); 
app.use(express.json());

// rutas disponibles
app.use("/api/auth", authRouter); // ruta para autenticacion
app.use("/api/turnos", turnosRouter); // ruta para turnos

app.listen(port, () => {
  console.log(`TuTurno server is running on port ${port}`);
});
