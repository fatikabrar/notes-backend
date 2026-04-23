console.log("App starting...");

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// Middleware
app.use(express.json());
app.use(cors());

// ✅ NOTES ROUTER ADDED (IMPORTANT FIX)
const notesrouter = require("./routes/notes"); // adjust path if needed
app.use("/notes", notesrouter);

// ROUTES
app.get("/", (req, res) => {
  res.status(200).send("API is live");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// DB CONNECTION
function connectDB() {
  const uri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

  return mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
  });
}

// SAFETY CHECK
if (!process.env.PORT) {
  console.error("PORT is not defined");
  process.exit(1);
}

// START SERVER ONLY AFTER DB
connectDB()
  .then(() => {
    console.log("MongoDB connected");

    app.listen(process.env.PORT, "0.0.0.0", () => {
      console.log("Server running on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.error("MongoDB error:", err);
    process.exit(1);
  });