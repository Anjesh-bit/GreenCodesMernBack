const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const CONNECTION_URI = process.env.CONNECTION_URI;
const connection = mongoose.connection;
const initializeDb = () => {
    //connection to mongoDB shell
    mongoose.connect(CONNECTION_URI, {
        serverSelectionTimeoutMS: 5000
    }).then(() => {
        console.log("Connection Established to the MongoDB")

    }).catch((error) => {
        console.log(error.message)
    })
    //error while initail connection
    connection.on('error', err => {
        console.log(err);
    });
    connection.on('disconnected', () => {
        console.log("The MongoDb shell is disconnected");
    })
}
module.exports = initializeDb;