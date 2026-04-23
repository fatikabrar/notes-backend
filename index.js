console.log("App starting...");

const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Routes first
app.get("/", (req, res) => {
  res.status(200).send("API is live");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

const PORT = process.env.PORT || 8080;

// Start server FIRST
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);

  // THEN connect DB after server is ready
  connectDB();
});

// DB function controlled (IMPORTANT)
const mongoose = require("mongoose");

function connectDB() {
  const uri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

  mongoose
    .connect(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
      console.error("MongoDB error:", err);
      // DO NOT crash Railway
    });
}