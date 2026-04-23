console.log("App starting...");

const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

// ROOT
app.get("/", (req, res) => {
  res.status(200).send("API is live");
});

// HEALTH CHECK
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Start server FIRST (important for Railway)
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

// THEN connect DB (non-blocking)
require("./db");