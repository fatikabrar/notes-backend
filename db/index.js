const mongoose = require("mongoose"); 
 require('dotenv').config();  

const { DATABASE_URL, DATABASE_USER ,DATABASE_PASSWORD, DATABASE_NAME } = process.env;

mongoose.connect(`mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_URL}/${DATABASE_NAME}?retryWrites=true&w=majority`);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to MongoDB");
}); 