const mongoose = require("mongoose");
require("dotenv").config();

const {
  DATABASE_URL,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = process.env;

// Safety check (VERY IMPORTANT for Railway)
if (!DATABASE_URL || !DATABASE_USER || !DATABASE_PASSWORD || !DATABASE_NAME) {
  console.error("❌ Missing MongoDB environment variables");
  process.exit(1);
}

const uri = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_URL}/${DATABASE_NAME}?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  serverSelectionTimeoutMS: 5000, // prevents Railway hang
  connectTimeoutMS: 5000,
})
.then(() => console.log("MongoDB connected"))
.catch(err => {
  console.error("MongoDB connection error:", err);
  process.exit(1); // fail fast instead of hanging Railway
});