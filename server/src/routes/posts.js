import express from "express";
const router = express.Router();
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} from "../controllers/post.js";
import { auth } from "../middlewares/auth.js";

router.post("/post/create", auth, createPost);
router.get("/post", getPosts);
router.get("/post/:id", auth, getPost);
router.put("/post/:id", auth, updatePost);
router.delete("/post/:id", auth, deletePost);

export default router;
