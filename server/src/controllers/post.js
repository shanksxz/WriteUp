import { z } from "zod";
import { Post } from "../models/index.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const author = req.user.id;

    let imageUrl = null;
    let publicId = null;
    if (req.files && req.files.image && req.files.image[0]) {
      const result = await uploadOnCloudinary(req.files.image[0].path);
      if (result) {
        imageUrl = result.url;
        publicId = result.public_id;
      }
    }

    const post = await Post.create({ 
      title, 
      content, 
      image: imageUrl,
      imagePublicId: publicId,
      author 
    });

    res.status(201).json({ post });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    
    let updateData = { title, content };

    const existingPost = await Post.findById(req.params.id);
    if (!existingPost) return res.status(404).json({ error: "Post not found" });

    if (req.files && req.files.image && req.files.image[0]) {
      const result = await uploadOnCloudinary(req.files.image[0].path);
      if (result) {
        updateData.image = result.url;
        updateData.imagePublicId = result.public_id;
      }
    }

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true },
    );

    res.status(200).json({ post });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
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

export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.id }).populate(
      "author",
      "username",
    );
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    console.log("inside getPost", req.params.id)
    const post = await Post.findById(req.params.id).populate("author","username");

    if (!post) return res.status(404).json({ error: "Post not found" });

    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

