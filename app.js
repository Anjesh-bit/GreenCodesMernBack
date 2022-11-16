const express = require('express');
const contactRouter = require('./router/contactRoutes');
const adminRouter = require('./router/adminRouter');
const blogsRouter = require('./router/blogsRouter');
const initializeDb = require('./db/initDb');
const cors = require('cors')

const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
initializeDb();
//express framework for nodejs
const app = express();
app.use(cors());
app.use(express.json());
app.use("/public", express.static('public'));
app.use("/greenApi/contact", contactRouter);
app.use("/greenApi/admin", adminRouter);
app.use("/greenApi/admin", blogsRouter);

app.listen(5000, () => {
    console.log(`Server Started on port ${PORT}`)
})