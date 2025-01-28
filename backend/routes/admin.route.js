import express from "express";
import { getAllUsers, getUserById, login } from "../controllers/admin.controller.js";
import isAuthenticated from "../middlewares/Auth.js";
import { authorizeAdmin } from "../middlewares/autorizeAdmin.js";


const router = express.Router();

router.route("/login").post(login)
router.route('/users').get(isAuthenticated,authorizeAdmin,getAllUsers);
router.route('/user/:id').get(isAuthenticated,authorizeAdmin,getUserById);


export default router;