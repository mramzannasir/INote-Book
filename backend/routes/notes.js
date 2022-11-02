const { json } = require("express");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");

// Route: 1 Get all note usign GET "api/notes/fetchnote Login required
router.get("/fetchnote", fetchuser, async (req, res) => {
  try {
    const note = await Notes.find({ user: req.user.id });
    res.json(note);
  } catch (error) {
    console.error(error.massege);
    res.status(500).send("Enternal server error");
  }
});

// Route: 2 Add note using  POST: "api/notes/addnote" Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter Valid title").isLength({ min: 4 }),
    body("description", "Enter a valid Description").isLength({ min: 8 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.massege);
      res.status(500).send("Enternal server error");
    }
  }
);

// Route: 3 Update note using  put: "api/notes/updatenote" Login required
router.put("/updatenotes/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    // Create a new object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag;
    }

    // Find the note and update

    // 1. It will find note and if note not found then send bad request 404
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // 2. It will matach user and if user not found then it will send bad request 404
    if (note.user.toString() !== req.user.id) {
      // take your note id not your user id
      return res.status(401).send("Not Allowd");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.massege);
    res.status(500).send("Enternal server errorssss");
  }
});

// Route: 4 Delete note using delete: "api/note/updatenote" Login required
router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
  try {
    // 1. It will find note and if note not found then delet is
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // 2. It will matach user and if user not found then it will send bad request 404
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowd");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted" });
  } catch (error) {
    console.error(error.massege);
    res.status(500).send("Enternal server error");
  }
});

module.exports = router;
