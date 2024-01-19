const mongoose = require('mongoose');
const connectMongoDB = async() =>{
    mongoose
  .connect(process.env.URL)
  .then(() => console.log("Connected to mongodb server"))
  .catch((err) => console.log(err));

}

module.exports = connectMongoDB;