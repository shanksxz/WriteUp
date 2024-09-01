import express from "express";
import { signup, signin, checkAuth } from "../controllers/auth.js";
import { auth } from "../middlewares/auth.js";
const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
router.post("/auth/me", auth, checkAuth);

export default router;

