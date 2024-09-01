import { z } from "zod";
import { User } from "../models/index.js";
import { userSchema } from "../validators/index.js";
import { JWT_SECRET } from "../config/config.js";
import ApiError from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};

export const signup = async (req, res) => {
  try {
    console.log(req.body);
    const { firstName, lastName, username, email, password } = userSchema.parse(
      req.body,
    );

    // check if the user already exists

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, "User already exists");
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // create the user
    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      password : hashedPassword
    });

    // create the token
    // const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    generateToken(res, user._id);

    res.status(201).json({ user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(500).json({ error: error.message });
  }
};

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const signin = async (req, res) => {
  try {

    console.log(req.body);
    const { email, password } = signInSchema.parse(req.body);

    console.log(email, password);

    const user = await User.findOne({ email });
    if (!user) throw new ApiError(404, "User not found");

    // compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ApiError(400, "Invalid credentials");

    // create the token
    generateToken(res, user._id);

    // send the user as response
    return res.status(200).json({ user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(500).json({ error: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if(!user) {
      res.status(404).json({message: "User not found"});
    }

    res.status(200).json({user});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

export const signout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Signout successful" });
};
