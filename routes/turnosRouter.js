import express from "express";
import turnosController from "../controllers/turnosController.js";
import fetchUser from "../middleware/fetchuser.js";

const router = express.Router();

// rutas definidas y usa los metodos del controlador
router.get("/", fetchUser, turnosController.fetchAllTurnos);
router.post("/", fetchUser, turnosController.addTurno);
router.put("/:id", fetchUser, turnosController.updateTurno);
router.delete("/:id", fetchUser, turnosController.deleteTurno);

export default router;
