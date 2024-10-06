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
    body("title").notEmpty().withMessage("Title tidak boleh kosong"),

    // Validasi genre
    body("genre").notEmpty().withMessage("Genre tidak boleh kosong"),

    // Validasi release_year
    body("release_year")
      .isInt({ min: 1888, max: new Date().getFullYear() })
      .withMessage(
        `Tahun harus di antara 1888 sampai ${new Date().getFullYear()}`
      ),
  ],
  (req, res) => {
    // Cek validasi request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("ERROR:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { title, genre, release_year } = req.body;

    console.log("Masukkan data untuk update MOVIES:", {
      id,
      title,
      genre,
      release_year,
    });

    pool.getConnection((err, koneksi) => {
      if (err) {
        console.log("DB ERROR:", err);
        return res.status(500).json({ error: "Tidak bisa konek ke db" });
      }

      // Cek apakah movie dengan ID tersebut ada
      const findQuery = "SELECT * FROM movies WHERE id = ?";
      koneksi.query(findQuery, [id], (err, results) => {
        if (err) {
          console.log("Error query:", err);
          koneksi.release();
          return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
          console.log("Movie tidak ada yang memiliki id:", id);
          koneksi.release();
          return res.status(404).json({ error: "Film tida ditemukan" });
        }

        // Lakukan update jika film ditemukan
        const updateQuery =
          "UPDATE movies SET title = ?, genre = ?, release_year = ? WHERE id = ?";
        koneksi.query(
          updateQuery,
          [title, genre, release_year, id],
          (err, result) => {
            koneksi.release();
            if (err) {
              console.log("ERROR update:", err);
              return res.status(500).json({ error: err.message });
            }

            console.log("Update untuk film dgn id:", id);
            res.status(200).json({
              message: "Update berhasi;",
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
