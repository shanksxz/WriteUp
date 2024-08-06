const express = require('express');
const logger = require('./config/logger');
const { PORT } = require('./config/config');
const app = express();
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/posts');
const ApiError = require('./utils/apiError');
const { dbconnect } = require('./config/db');


app.use(express.json());

//connect to the database
dbconnect();

//logging middleware
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/v1', userRoutes);
app.use('/api/v1', postRoutes);

app.use((req, res, next) => {
    next(new ApiError(404, `Can't find ${req.originalUrl} on this server!`));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});