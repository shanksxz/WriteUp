import { JWT_SECRET } from "../config/config.js";
import ApiError from "../utils/apiError.js";
import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.body.token || req.headers["Authorization"].replace("Bearer ", "");
    if (!token) throw new ApiError(401, "Unauthorized");

    // verify the token
    const user = jwt.verify(token, JWT_SECRET);
    console.log("Auth middleware", user);

    if (!user) throw new ApiError(401, "Unauthorized");
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

