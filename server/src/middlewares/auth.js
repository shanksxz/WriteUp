const { JWT_SECRET } = require("../config/config");
const ApiError = require("../utils/apiError");
const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
    try {
        const token = req.body.token || req.headers["Authorization"].replace("Bearer ", "");
        if(!token) throw new ApiError(401, "Unauthorized");

        // verify the token
        const user = jwt.verify(token, JWT_SECRET);
        console.log("Auth middleware", user);

        if(!user) throw new ApiError(401, "Unauthorized");
        req.user = user;
        next();

    } catch (error) {
        return res.status(500).json({ error: error.message });        
    }
}