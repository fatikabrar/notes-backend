const mongoose = require("mongoose");

function connectDB() {
  const uri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

  return mongoose.connect(uri)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB error:", err));
}

module.exports = connectDB;