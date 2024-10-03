const express = require("express");
const { body, validationResult } = require("express-validator");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
const jsonParser = bodyParser.json();

// Konfigurasi koneksi ke database
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "movies",
});

// PUT update dengan validasi
app.put(
  "/movies/:id",
  jsonParser,
  [
    // Validasi title
    body("title").notEmpty().withMessage("Title is required"),

    // Validasi genre
    body("genre")
      .isString()
      .withMessage("Genre must be a string")
      .notEmpty()
      .withMessage("Genre is required"),

    // Validasi release_year
    body("release_year")
      .isInt({ min: 1888, max: new Date().getFullYear() })
      .withMessage(
        `Release year must be between 1888 and ${new Date().getFullYear()}`
      ),
  ],
  (req, res) => {
    // Cek validasi request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { title, genre, release_year } = req.body;

    console.log("Incoming PUT request to update movie:", {
      id,
      title,
      genre,
      release_year,
    });

    pool.getConnection((err, connection) => {
      if (err) {
        console.log("Database connection error:", err);
        return res.status(500).json({ error: "Error connecting to database" });
      }

      // Cek apakah movie dengan ID tersebut ada
      const findQuery = "SELECT * FROM movies WHERE id = ?";
      connection.query(findQuery, [id], (err, results) => {
        if (err) {
          console.log("Error in findQuery:", err);
          connection.release();
          return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
          console.log("Movie not found for id:", id);
          connection.release();
          return res.status(404).json({ error: "Movie not found" });
        }

        // Lakukan update jika film ditemukan
        const updateQuery =
          "UPDATE movies SET title = ?, genre = ?, release_year = ? WHERE id = ?";
        connection.query(
          updateQuery,
          [title, genre, release_year, id],
          (err, result) => {
            connection.release();
            if (err) {
              console.log("Error during update:", err);
              return res.status(500).json({ error: err.message });
            }

            console.log("Update success for movie ID:", id);
            res.status(200).json({
              message: "Movie updated successfully",
              data: { id, title, genre, release_year },
            });
          }
        );
      });
    });
  }
);

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
