import { z } from "zod";
import { Post } from "../models/index.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const author = req.user.id;
    let imageUrl = null;
    let publicId = null;

    if (req.file) {
      const result = await uploadOnCloudinary(req.file.buffer, req.file.originalname);
      if (result) {
        imageUrl = result.secure_url;
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

    if (req.file) {
      const result = await uploadOnCloudinary(req.file.buffer, req.file.originalname);
      if (result) {
        updateData.image = result.secure_url;
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skipIndex = (page - 1) * limit;

    const totalPosts = await Post.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);

    const posts = await Post.find()
      .populate("author", "username")
      .sort({ createdAt: -1 })
      .skip(skipIndex)
      .limit(limit);

    res.status(200).json({
      posts,
      currentPage: page,
      totalPages,
      totalPosts,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skipIndex = (page - 1) * limit;

    const totalPosts = await Post.countDocuments({ author: req.user.id });
    const totalPages = Math.ceil(totalPosts / limit);

    const posts = await Post.find({ author: req.user.id })
      .populate("author", "username")
      .sort({ createdAt: -1 })
      .skip(skipIndex)
      .limit(limit);

    res.status(200).json({
      posts,
      currentPage: page,
      totalPages,
      totalPosts,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    });
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