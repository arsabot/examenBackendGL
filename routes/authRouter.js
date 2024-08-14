import express from "express";
import { check } from "express-validator";
import authController from "../controllers/authController.js";
import fetchuser from "../middleware/fetchuser.js";

const router = express.Router();

// rutas de autenticación
router.route("/getuser").get(fetchuser, authController.getUser);

router.route("/createuser").post(
  [
    check("name", "Nombre es requerido").not().isEmpty(),
    check("email", "Email es requerido").isEmail(),
    check("password", "Password debe tener al menos 6 caracteres").isLength({
      min: 6,
    }),
  ],
  authController.createUser
);

router
  .route("/login")
  .post(
    [
      check("email", "Email es requerido").isEmail(),
      check("password", "Password es requerido").exists(),
    ],
    authController.loginUser
  );

// rutas de administración
router.route("/admin/users").get(fetchuser, authController.getAllUsers);
router.get("/admin/user/:id", fetchuser, authController.getUserById);
router
  .route("/admin/users/with-turno")
  .get(fetchuser, authController.getAllUsersWithTurnos);

router.route("/admin/users/:id").delete(fetchuser, authController.deleteUser);

export default router;
