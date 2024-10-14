const express = require("express");
const cors = require("cors");
const { body, query, validationResult } = require("express-validator");
const mysql = require("mysql");

const app = express();
const port = 3000;

// Aktifkan CORS
app.use(cors());

// Middleware untuk parsing JSON
app.use(express.json());

// Pool connection ke database MySQL
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "movies",
});

// Route untuk mendapatkan semua data dari tabel 'movies', dengan opsi sorting dan pencarian menggunakan LIKE
app.get("/movies", (req, res) => {
  const { sortBy, orderBy, title } = req.query;
  let query = "SELECT * FROM movies";
  const queryParams = [];

  if (title) {
    query += " WHERE title LIKE ?";
    queryParams.push(`%${title}%`);
  }

  if (sortBy && orderBy) {
    query += ` ORDER BY ${mysql.escapeId(sortBy)} ${orderBy.toUpperCase()}`;
  }

  pool.getConnection((err, connection) => {
    if (err) throw err; // Tangani error koneksi
    connection.query(query, queryParams, (err, rows) => {
      connection.release();
      if (!err) {
        return res.status(200).json({ data: rows });
      } else {
        return res.status(500).json({ error: err });
      }
    });
  });
});

// Route untuk menghapus data berdasarkan ID (DELETE)
app.delete("/movies/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; // Tangani error koneksi
    connection.query(
      "DELETE FROM movies WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.status(200).json({ message: "Movie deleted", data: rows });
        } else {
          res.status(500).json({ error: err });
        }
      }
    );
  });
});

// Route untuk menambahkan data ke database (POST)
app.post("/", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; // Tangani error koneksi
    const params = req.body;
    connection.query("INSERT INTO movies SET ?", params, (err, rows) => {
      connection.release();
      if (!err) {
        res.status(201).json({ message: "Movie added", data: rows });
      } else {
        res.status(500).json({ error: err });
      }
    });
  });
});

// Route untuk update data (PUT) dengan validasi
app.put(
  "/movies/:id",
  [
    body("title").notEmpty().withMessage("Title tidak boleh kosong"),
    body("genre").notEmpty().withMessage("Genre tidak boleh kosong"),
    body("release_year")
      .isInt({ min: 1888, max: new Date().getFullYear() })
      .withMessage(
        `Tahun harus di antara 1888 sampai ${new Date().getFullYear()}`
      ),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { title, genre, release_year } = req.body;

    pool.getConnection((err, connection) => {
      if (err) throw err; // Tangani error koneksi

      connection.query(
        "SELECT * FROM movies WHERE id = ?",
        [id],
        (err, results) => {
          if (err) {
            connection.release();
            return res.status(500).json({ error: err.message });
          }

          if (results.length === 0) {
            connection.release();
            return res.status(404).json({ error: "Movie tidak ditemukan" });
          }

          const updateQuery =
            "UPDATE movies SET title = ?, genre = ?, release_year = ? WHERE id = ?";
          connection.query(
            updateQuery,
            [title, genre, release_year, id],
            (err, result) => {
              connection.release();
              if (!err) {
                res.status(200).json({
                  message: "Movie updated",
                  data: { id, title, genre, release_year },
                });
              } else {
                res.status(500).json({ error: err.message });
              }
            }
          );
        }
      );
    });
  }
);

// Jalankan server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
