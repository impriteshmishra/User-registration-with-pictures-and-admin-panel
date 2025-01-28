import express from "express";
import { getAllUsers, getUserById, login } from "../controllers/admin.controller.js";
import isAuthenticated from "../middlewares/Auth.js";

const router = express.Router();

router.route("/login").post(login)
router.route('/users').get(getAllUsers);
router.route('/user/:id').get(getUserById);


export default router;