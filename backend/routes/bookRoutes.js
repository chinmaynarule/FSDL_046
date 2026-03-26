const express = require("express");
const router = express.Router();
const Book = require("../models/book");

// INSERT
router.post("/", async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.send("Book Added");
});

// GET ALL
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// DELETE
router.delete("/:isbn", async (req, res) => {
  await Book.findOneAndDelete({ isbn: req.params.isbn });
  res.send("Book Deleted");
});

// UPDATE
router.put("/:isbn", async (req, res) => {
  await Book.findOneAndUpdate({ isbn: req.params.isbn }, req.body);
  res.send("Book Updated");
});

module.exports = router;