console.log("App starting...");

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

// ROUTES
app.get("/", (req, res) => {
  res.status(200).send("API is live");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// DB CONNECTION (start separately BEFORE server)
function connectDB() {
  const uri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

  return mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
  });
}

// START SERVER ONLY AFTER DB ATTEMPT
const PORT = process.env.PORT;

connectDB()
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log("Server running on port", PORT);
    });
  })
  .catch((err) => {
    console.error("MongoDB error:", err);
    process.exit(1); // IMPORTANT for Railway (fail fast)
  });