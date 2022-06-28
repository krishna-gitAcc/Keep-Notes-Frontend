const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');



//Route 1: Get all the Notes using: GET "/api/notes/fetchallnotes". Login Required.
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.id });
        res.json(notes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    // res.send("Hello form the notes api endpoints");
})



//Route 2: Add a new note using : POST "/api/notes/addnotes". Login Required.
router.post('/addnotes', fetchuser, [
    //validation of title and description using express validator
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', "Description must be atleast 5 characters").isLength({ min: 5 }),
], async (req, res) => {

    try {
        //if there are error return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, description, tag } = req.body;

        const note = new Note({
            title,
            description,
            tag,
            user: req.id
        });

        const savedNote = await note.save();
        res.json(savedNote);

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal Server Error");

    }


    // res.send("Hello form the notes api endpoints");
});

//Route 3: Update an existing note: POST "/api/notes/updatenote". Login Required.
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    //Create a newNote object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    try {
        //Find the note to be updated and update it
        let note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not Found")
        }

        if (note.user.toString() !== req.id) {
            return res.status(401).send("Not allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.send(note);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");

    }

});

//Route 4: Delete an existing note: delete "/api/notes/deletenote". Login Required.
router.delete('/deletenote/:id', fetchuser, async (req, res) => {


    try {
        //Find the note to be updated and update it
        let note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not Found")
        }
        //Allow deletion only if user owns this NOte
        if (note.user.toString() !== req.id) {
            return res.status(401).send("Not allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note: note });


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});


module.exports = router;