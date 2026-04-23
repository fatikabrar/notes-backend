const express = require('express');
const notesrouter = express.Router();

const noteModel = require("../../db/models/note.model");


console.log("NOTES ROUTER LOADED");

// 🔹 GET ALL NOTES
notesrouter.get("/", async (req, res) => {
    try {
        const notes = await noteModel.find({});
        res.json({
            listofnotes: notes
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Failed to fetch notes"
        });
    }
});


// 🔹 ADD A NOTE
notesrouter.post("/", async (req, res) => {
    try {
        const newnote = new noteModel(req.body);
        const savedNote = await newnote.save();

        res.json({
            note: savedNote,
            success: true
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Failed to save note"
        });
    }
});


// 🔹 DUMMY ROUTE (must be BEFORE :id)
notesrouter.get("/dummy", (req, res) => {
    res.json({ text: "dummy" });
});


// 🔹 GET NOTE BY ID
notesrouter.get("/:id", async (req, res) => {
    try {
        const note = await noteModel.findById(req.params.id);

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.json({
            note: note
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Error fetching note"
        });
    }
});


// 🔹 UPDATE NOTE BY ID
notesrouter.put("/:id", async (req, res) => {
    try {
        const updatedNote = await noteModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({
                message: "Note not found for updating"
            });
        }

        res.json({
            message: "Note updated successfully",
            note: updatedNote
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Error updating note"
        });
    }
});


// 🔹 DELETE NOTE BY ID
notesrouter.delete("/:id", async (req, res) => {
    try {
        const deletedNote = await noteModel.findByIdAndDelete(req.params.id);

        if (!deletedNote) {
            return res.status(404).json({
                message: "Note not found for deletion"
            });
        }

        res.json({
            message: "Note deleted successfully",
            note: deletedNote
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Error deleting note"
        });
    }
});


module.exports = notesrouter;