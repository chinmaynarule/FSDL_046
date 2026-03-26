const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection (no extra options)
mongoose.connect("mongodb+srv://admin:admin123@cluster0.3pfzghj.mongodb.net/libraryDB")
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log("MongoDB Error:", err);
});

// Routes
const bookRoutes = require("./routes/bookRoutes");
app.use("/api/books", bookRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});