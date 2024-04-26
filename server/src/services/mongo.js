const mongoose = require("mongoose");
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once("open", () => {
  console.log("Mongo db is connected!!!");
});

mongoose.connection.on("error", (err) => {
  console.log("Error in connecting mongodb...");
});

async function mongoConnect(){
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect(){
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}