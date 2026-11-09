import express from "express";
import { MongoClient, ObjectId } from "mongodb";
const app=express();
const MONGO_URI = "mongodb://admin:admin123@localhost:27017";
const dbName="booksDB";
const client = new MongoClient(MONGO_URI);
let db;
app.use(express.json());//middleware to parse JSON request bodies
client.connect().then(() => {
  db = client.db(dbName);
  console.log(`Connected to database: ${dbName}`);
  app.listen(8000, () => {
      console.log("Server running on http://localhost:8000");
    });
  }).catch((err) => {
    console.error("Failed to connect to database", err);
  });
//CRUD
// CREATE: POST http://localhost:8000/api/v1/books
// payload: { title, author, category, price }
app.post("/api/v1/books", (req, res) => {
  const body = req.body;
  db.collection("books").insertOne(body).then((result) => {
    res.status(201).json({message: "Book created successfully",
        data: { id: result.insertedId, ...body }
      });
    }).catch((err) => {
      res.status(500).json({message: "Book creation failed",
        error: err.message,
      });
    });
});
// READ ALL: GET http://localhost:8000/api/v1/books
app.get("/api/v1/books", (req, res) => {
  const { category } = req.query;
  const query = category ? { category } : {};
  db.collection("books").find(query).toArray().then((result) => {
      res.status(200).json({message: "Books fetched successfully",
        data: result,
      });
    }).catch((err) => {
      res.status(500).json({message: "Problem in fetching books",
        error: err.message,
      });
    });
});
// READ ONE: GET http://localhost:8000/api/v1/books/:id
app.get("/api/v1/books/:id", (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  db.collection("books").findOne({ _id: new ObjectId(id) }).then((result) => {
      if (!result) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.status(200).json({message: "Book fetched successfully",
        data: result,
      });
    }).catch((err) => {
      res.status(500).json({
        message: "Problem in fetching book details",
        error: err.message,
      });
    });
});
// UPDATE: PUT http://localhost:8000/api/v1/books/:id
app.put("/api/v1/books/:id", (req, res) => {
  const { id } = req.params;
  const updatedBook = req.body;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  db.collection("books").updateOne({ _id: new ObjectId(id) }, { $set: updatedBook }).then((result) => {
      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.status(200).json({message: "Book updated successfully",
        data: result,
      });
    }).catch((err) => {
      res.status(500).json({
        message: "Problem in updating book",
        error: err.message,
      });
    });
});
// DELETE: DELETE http://localhost:8000/api/v1/books/:id
app.delete("/api/v1/books/:id", (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  db.collection("books").deleteOne({ _id: new ObjectId(id) })
  .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.status(200).json({ message: "Book deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Problem in deleting book",
        error: err.message,
      });
    });
});