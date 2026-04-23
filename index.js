console.log("App starting...");

const express = require('express');
const app = express();

const cors = require('cors');
// const { notesrouter } = require("./api/v1/index");

require("./db");

app.use(express.json());
app.use(cors());

// ROOT
app.get("/", (req, res) => {
    res.send("hello world");
});

// app.use("/notes", notesrouter);

// IMPORTANT: use Railway PORT correctly
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});