console.log("App starting...");

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

// ✅ ROUTES
const notesrouter = require("./routes/notes");
app.use("/notes", notesrouter);

// ROOT
app.get("/", (req, res) => {
  res.send("API is live");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// DB CONNECT
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