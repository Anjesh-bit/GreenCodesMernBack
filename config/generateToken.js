const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRETE;
const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: "30D",
    });
};

module.exports = generateToken;