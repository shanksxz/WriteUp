const mongoose = require('mongoose');
const { DATABASE_URL } = require('./config');

exports.dbconnect = async () => {
    try {
        await mongoose.connect(DATABASE_URL);
        console.log('Database connected successfully');
    } catch (error) {
        console.log("Database connection failed");
    }
};