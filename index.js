const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
dotenv.config()


const app = express();
app.use(express.json())
app.use(cors())


const blogRoute = require('./routes/Blog')
mongoose
.connect(process.env.URL)
.then(() => console.log("Connected to mongodb server"))
.catch((err) => console.log(err));
app.use("/api",blogRoute);





app.listen(process.env.PORT || 3005 , ()=>{
    console.log(`Listening on port ${process.env.PORT}`)
})