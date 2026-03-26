const express = require('express');
const app = express();

app.use(express.json());

// Dummy database
let books = [];

// GET - Fetch all books
app.get('/books', (req, res) => {
    res.json(books);
});

// POST - Add new book
app.post('/books', (req, res) => {
    const book = req.body;
    books.push(book);
    res.json({ message: "Book added successfully", book });
});

// PUT - Update book by index
app.put('/books/:id', (req, res) => {
    const id = req.params.id;
    books[id] = req.body;
    res.json({ message: "Book updated", updatedBook: books[id] });
});

// DELETE - Remove book
app.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    books.splice(id, 1);
    res.json({ message: "Book deleted" });
});

// Start server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});