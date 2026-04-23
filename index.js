process.on("uncaughtException", (err) => {
  console.error("CRASH:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("REJECTION:", err);
});


console.log("App starting...");

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

// ✅ ROUTES
console.log("LOADING ROUTES...");
// const notesrouter = require("./api/v1/notes"); // ✅ FIXED PATH
// 🔥 TEMP: do NOT mount real router yet
app.use("/api/v1/notes", (req, res) => {
  res.send("ROUTE WORKING"); 
});
console.log("ROUTES LOADED");


app.get("/", (req, res) => {
  res.send("API is live");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// DB
function connectDB() {
  const uri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`;

  mongoose.connect(uri)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB error:", err));
}

// START SERVER
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
  connectDB();
});