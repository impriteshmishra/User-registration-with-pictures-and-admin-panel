import express from "express";
import { register } from "../controllers/user.controller.js";
import upload from './../middlewares/multer.js';

const router = express.Router();

router.route('/register').post(upload,register);


export default router;