import express from "express";
import { signup, signin, checkAuth, signout } from "../controllers/auth.js";
import { auth } from "../middlewares/auth.js";
import { getUserPosts } from "../controllers/post.js";
const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
router.get("/auth/me", auth, checkAuth);
router.get("/user/posts", auth, getUserPosts);
router.get("/auth/signout", signout);

export default router;

