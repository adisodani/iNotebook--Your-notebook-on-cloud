const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');

// Route 1: Get all the notes using: GET "/api/auth/createuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
})

// Route 2: Add a new note using: POST "/api/auth/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a Valid Title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //If there are errors return bad requests.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
});

// Route 3: Update a existing note using: PUT "/api/auth/updatenote/:id". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newNote= {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //Find the note to be updated and update it
        let note= await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Note Not Found");
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note= await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        res.json({note});
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
});

// Route 4: Update a delete note using: PUT "/api/auth/deletenote/:id". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //Find the note to be deleted and delete it
        let note= await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Note Not Found");
        }

        //Allow deletion if note is of the user
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note= await Note.findByIdAndDelete(req.params.id);
        res.json({"status": "Note has been Deleted", note: note});
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error.");
    }
});
module.exports = router;