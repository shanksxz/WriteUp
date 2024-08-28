import express from "express";
import logger from "./config/logger.js";
import { PORT } from "./config/config.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/posts.js";
import ApiError from "./utils/apiError.js";
import { dbconnect } from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
// cors
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: "GET,POST,PUT,DELETE",
    }),
);

//connect to the database
dbconnect();

//logging middleware
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api/v1", userRoutes);
app.use("/api/v1", postRoutes);

app.use((req, res, next) => {
    next(new ApiError(404, `Can't find ${req.originalUrl} on this server!`));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
