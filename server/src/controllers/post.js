import { z } from "zod";
import { Post } from "../models/index.js";
import { postSchema } from "../validators/index.js";

export const createPost = async (req, res) => {
  try {
    // validate the req body
    const { title, content, image } = postSchema.parse(req.body);

    // get the user id from the req.user object
    const author = req.user.id;

    // create the post
    const post = await Post.create({ title, content, image, author });

    // send the post as response
    res.status(201).json({ post });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username");

    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username",
    );

    if (!post) return res.status(404).json({ error: "Post not found" });

    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, content, image } = postSchema.parse(req.body);

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, image },
      { new: true },
    );

    if (!post) return res.status(404).json({ error: "Post not found" });

    res.status(200).json({ post });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) return res.status(404).json({ error: "Post not found" });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

