module.exports.dbConnection = dbConnection
const mongoose = require('mongoose');
require('dotenv').config()

async function dbConnection() {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB online")
  } catch (error) {
    console.error(error);
    throw new Error('asd')
  }
}