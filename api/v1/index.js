const express = require('express');
const notesrouter = express.Router();

const noteModel = require('../../db/models/note.model');

// GET ALL NOTES
notesrouter.get("/", (request, response) => {
    noteModel.find({}).then((notes) => {
        response.json({
            listofnotes: notes
        });
    });
});

// ADD A NOTE
notesrouter.post("/", (request, response) => {
    console.log(request.body);
    const newnote = new noteModel(request.body);
    newnote.save().then((savedNote) => {
        response.json({
            note: savedNote,
            success: true
        });
    });
});

// GET NOTE BY ID
notesrouter.get("/:id", (request, response) => {
    response.json({
        reply: "note by id successfully"
    });
});

// DELETE NOTE BY ID
notesrouter.delete("/:id", (request, response) => {
    response.json({
        reply: "note deleted successfully"
    });
});

// UPDATE NOTE BY ID  ← FIXED (No callback)
notesrouter.put("/:id", (request, response) => {
    const noteId = request.params.id;
    const updatedData = request.body;

    noteModel.findByIdAndUpdate(noteId, updatedData, { new: true })
        .then((updatedNote) => {
            if (!updatedNote) {
                return response.status(404).json({
                    message: "Note not found for updating"
                });
            }

            response.json({
                reply: "note updated by id successfully",
                note: updatedNote
            });
        })
        .catch((err) => {
            console.log(err);
            response.status(500).json({
                message: "Error updating note"
            });
        });
});

// DUMMY ROUTE
notesrouter.get("/dummy", (request, response) => {
    response.json({ text: "dummy" });
});

module.exports = {
    notesrouter
};