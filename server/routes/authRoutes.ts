import express, { Request, Response, NextFunction } from "express";
import { register, login, googleLogin } from "../controllers/authController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/google-login", googleLogin);

export default router;
