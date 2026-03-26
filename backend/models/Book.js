const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookName: String,
  isbn: String,
  title: String,
  author: String,
  publisher: String
});

module.exports = mongoose.model("Book", bookSchema);