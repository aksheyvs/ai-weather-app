import { Router } from "express";
import { registerUser, loginUser } from "../controller/auth.controller.js";
import { validateRegister, validateLogin } from "../validations/auth.validation.js";

const router = Router();

router.post("/register", validateRegister, registerUser);

router.post("/login", validateLogin, loginUser);

export default router;