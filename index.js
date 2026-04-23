console.log("App starting...");

const express = require("express");
const app = express();
const cors = require("cors");

const connectDB = require("./db"); // 👈 import DB function

app.use(express.json());
app.use(cors());

// ROUTES
const notesrouter = require("./routes/notes");
app.use("/notes", notesrouter);

app.get("/", (req, res) => {
  res.send("API is live");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// START SERVER FIRST (IMPORTANT FOR RAILWAY)
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);

  // THEN connect DB (non-blocking)
  connectDB();
});