import { z } from "zod";
import { User } from "../models/index.js";
import { userSchema } from "../validators/index.js";
import { JWT_SECRET } from "../config/config.js";
import ApiError from "../utils/apiError.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = userSchema.parse(
      req.body,
    );

    // validate the password
    if (password !== confirmPassword)
      throw new ApiError(400, "Passwords do not match");

    // create the user
    const user = await User.create({
      username,
      email,
      password,
    });

    // create the token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    // send the user as response
    return res.status(201).json({ user, token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(500).json({ error: error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = userSchema
      .pick(["email", "password"])
      .parse(req.body);

    const user = await User.findOne({ email });
    if (!user) throw new ApiError(404, "User not found");

    // compare the password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new ApiError(400, "Invalid credentials");

    // create the token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    // send the user as response
    return res.status(200).json({ user, token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(500).json({ error: error.message });
  }
};
