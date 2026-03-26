import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [book, setBook] = useState({
    bookName: "",
    isbn: "",
    title: "",
    author: "",
    publisher: ""
  });

  const [books, setBooks] = useState([]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const addBook = async () => {
    if (!book.bookName || !book.isbn) {
      alert("Please fill required fields");
      return;
    }

    await axios.post("http://localhost:5000/api/books", book);
    alert("Book added successfully ✅");

    setBook({
      bookName: "",
      isbn: "",
      title: "",
      author: "",
      publisher: ""
    });

    fetchBooks();
  };

  const fetchBooks = async () => {
    const res = await axios.get("http://localhost:5000/api/books");
    setBooks(res.data);
  };

  const deleteBook = async (isbn) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    await axios.delete(`http://localhost:5000/api/books/${isbn}`);
    alert("Book deleted ❌");

    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Library System</h1>

      {/* FORM */}
      <div style={styles.form}>
        <input name="bookName" placeholder="Book Name" value={book.bookName} onChange={handleChange} style={styles.input}/>
        <input name="isbn" placeholder="ISBN" value={book.isbn} onChange={handleChange} style={styles.input}/>
        <input name="title" placeholder="Title" value={book.title} onChange={handleChange} style={styles.input}/>
        <input name="author" placeholder="Author" value={book.author} onChange={handleChange} style={styles.input}/>
        <input name="publisher" placeholder="Publisher" value={book.publisher} onChange={handleChange} style={styles.input}/>
      </div>

      <div style={{ textAlign: "center" }}>
        <button onClick={addBook} style={styles.addBtn}>Add Book</button>
      </div>

      {/* TABLE */}
      <h2 style={styles.subHeading}>Book List</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>ISBN</th>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Author</th>
            <th style={styles.th}>Publisher</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>

        <tbody>
          {books.map((b) => (
            <tr key={b.isbn}>
              <td style={styles.td}>{b.bookName}</td>
              <td style={styles.td}>{b.isbn}</td>
              <td style={styles.td}>{b.title}</td>
              <td style={styles.td}>{b.author}</td>
              <td style={styles.td}>{b.publisher}</td>
              <td style={styles.td}>
                <button onClick={() => deleteBook(b.isbn)} style={styles.deleteBtn}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ✅ CLEAN STYLES */
const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial",
    background: "#1e1e2f",   // dark background
    minHeight: "100vh",
    color: "#f1f1f1"
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px"
  },
  subHeading: {
    textAlign: "center",
    marginTop: "30px"
  },
  form: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "15px"
  },
  input: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #444",
    width: "150px",
    background: "#2c2c3e",
    color: "white"
  },
  addBtn: {
    padding: "8px 20px",
    background: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  table: {
    width: "90%",
    margin: "20px auto",
    borderCollapse: "collapse",
    background: "#2c2c3e",   // dark table
    boxShadow: "0 2px 10px rgba(0,0,0,0.4)"
  },
  th: {
    border: "1px solid #444",
    padding: "10px",
    background: "#3a3a52"
  },
  td: {
    border: "1px solid #444",
    padding: "10px",
    textAlign: "center"
  },
  deleteBtn: {
    background: "#e74c3c",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default App;