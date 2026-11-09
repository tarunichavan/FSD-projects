import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT;
const mongoUrl = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;


// MongoDB Connection
mongoose
  .connect(`${mongoUrl}/${dbName}`)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Problem with connecting to MongoDB", err);
  });


// Schema
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  director: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  year: {
    type: Number,
    required: true
  }
});


// Model
const Movie = mongoose.model("movie", movieSchema);


// CREATE - POST
app.post("/api/v1/movies", (req, res) => {

  Movie.create(req.body)
    .then((result) => {
      res.status(201).json({
        message: "Movie created successfully",
        data: result
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Failed creating movie",
        error: err.message
      });
    });

});


// READ ALL - find()
app.get("/api/v1/movies", (req, res) => {

  Movie.find()
    .then((result) => {
      res.status(200).json({
        message: "Movies fetched successfully",
        data: result
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed fetching movies",
        error: err.message
      });
    });

});


// READ ONE - findOne()
app.get("/api/v1/movies/title/:title", (req, res) => {

  Movie.findOne({
    title: req.params.title
  })
    .then((result) => {

      if (result) {
        res.status(200).json({
          message: "Movie fetched successfully",
          data: result
        });
      } else {
        res.status(404).json({
          message: "Movie not found"
        });
      }

    })
    .catch((err) => {
      res.status(400).json({
        message: "Failed fetching movie",
        error: err.message
      });
    });

});


// UPDATE - findOneAndUpdate()
app.put("/api/v1/movies/title/:title", (req, res) => {

  Movie.findOneAndUpdate(
    { title: req.params.title },
    req.body,
    { new: true, runValidators: true }
  )
    .then((result) => {

      if (result) {
        res.status(200).json({
          message: "Movie updated successfully",
          data: result
        });
      } else {
        res.status(404).json({
          message: "Movie not found"
        });
      }

    })
    .catch((err) => {
      res.status(400).json({
        message: "Failed updating movie",
        error: err.message
      });
    });

});


// UPDATE - findByIdAndUpdate()
app.put("/api/v1/movies/id/:id", (req, res) => {

  Movie.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  )
    .then((result) => {

      if (result) {
        res.status(200).json({
          message: "Movie updated successfully",
          data: result
        });
      } else {
        res.status(404).json({
          message: "Movie not found"
        });
      }

    })
    .catch((err) => {
      res.status(400).json({
        message: "Failed updating movie",
        error: err.message
      });
    });

});


// DELETE - findByIdAndDelete()
app.delete("/api/v1/movies/:id", (req, res) => {

  Movie.findByIdAndDelete(req.params.id)
    .then((result) => {

      if (result) {
        res.status(200).json({
          message: "Movie deleted successfully",
          data: result
        });
      } else {
        res.status(404).json({
          message: "Movie not found"
        });
      }

    })
    .catch((err) => {
      res.status(400).json({
        message: "Failed deleting movie",
        error: err.message
      });
    });

});


// Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});