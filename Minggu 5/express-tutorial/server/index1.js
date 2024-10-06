const express = require("express");

const { body, validationResult } = require("express-validator");

const app = express();

const mysql = require("mysql");

// post insert data dan update
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "movies",
});

// app.get('/', (req, res) => {
//     res.send('<i>Hello, World!</i>');
// });

// // kode utk run dipostman
// app.get("/", (req, res) => {
//   pool.getConnection((err, connection) => {
//     if (err) throw err;
//     connection.query("SELECT * from movies", (err, rows) => {
//       connection.release(); // return the connection to pool
//       if (!err) {
//         res.status(200).json({ data: rows });
//       } else {
//         res.status(500).json({ error: err });
//       }
//     });
//   });
// });

// dapat data dari database pakai id
// app.get("/:id", (req, res) => {
//   pool.getConnection((err, connection) => {
//     if (err) throw err;
//     connection.query(
//       "SELECT * FROM movies WHERE id = ?",
//       [req.params.id],
//       (err, rows) => {
//         connection.release(); // return the connection to pool
//         if (!err) {
//           res.status(200).json({ data: rows });
//         } else {
//           res.status(500).json({ error: err });
//         }
//       }
//     );
//   });
// });

// // Delete Movie by Id (method DELETE)
// app.delete("/:id", (req, res) => {
//   pool.getConnection((err, connection) => {
//     if (err) throw err;
//     connection.query(
//       "DELETE FROM movies WHERE id = ?",
//       [req.params.id],
//       (err, rows) => {
//         connection.release(); // return the connection to pool
//         if (!err) {
//           res.status(200).json({ data: rows });
//         } else {
//           res.status(500).json({ error: err });
//         }
//       }
//     );
//   });
// });

// // insert data
// app.post("/", jsonParser, (req, res) => {
//   pool.getConnection((err, connection) => {
//     if (err) throw err;
//     const params = req.body;
//     connection.query("INSERT INTO movies SET ?", params, (err, rows) => {
//       connection.release(); // return the connection to pool
//       if (!err) {
//         res.status(200).json({ data: rows });
//       } else {
//         res.status(500).json({ error: err });
//       }
//     });
//   });
// });

// // put update
// app.put("/:id", jsonParser, (req, res) => {
//   console.log(req);
//   const { id } = req.params;
//   const params = req.body;
//   pool.getConnection((err, connection) => {
//     if (err) throw err;
//     const fields = [];
//     const values = [];
//     for (const key in params) {
//       fields.push(`${key} = ?`);
//       values.push(params[key]);
//     }
//     const query = `UPDATE movies SET ${fields.join(", ")} WHERE id = ?`;
//     values.push(Number(id));
//     connection.query(query, values, (err, rows) => {
//       connection.release(); // return the connection to pool
//       console.log(err);
//       if (!err) {
//         res.status(200).json({ data: rows });
//       } else {
//         return res.status(500).json({ error: err });
//       }
//     });
//   });
// });

// //ini utk sort
// app.get("/", (req, res) => {
//   const { sortBy, orderBy } = req.query;
//   const query = `SELECT * FROM movies ORDER BY ${mysql.escapeId(
//     sortBy
//   )} ${orderBy.toUpperCase()}`;
//   pool.getConnection((err, connection) => {
//     if (err) throw err;
//     connection.query(query, (err, rows) => {
//       connection.release(); // return the connection to pool
//       if (!err) {
//         return res.status(200).json({ data: rows });
//       } else {
//         return res.status(500).json({ error: err });
//       }
//     });
//   });
// });

// //mencari menggunakan like
// app.get("/", (req, res) => {
//   const { sortBy, orderBy, title } = req.query;
//   const query = `SELECT * FROM movies WHERE title like ? ORDER BY
//   ${mysql.escapeId(sortBy)} ${orderBy.toUpperCase()}`;
//   pool.getConnection((err, connection) => {
//     if (err) throw err;
//     connection.query(query, [title], (err, rows) => {
//       connection.release(); // return the connection to pool
//       if (!err) {
//         return res.status(200).json({ data: rows });
//       } else {
//         return res.status(500).json({ error: err });
//       }
//     });
//   });
// });

// //validasi data
// app.get(
//   "/movies",
//   [
//     query("title").isAlphanumeric(), //bisa isstring juga kalo diperlukan spasi
//     query("sortBy").optional().trim().escape(),
//     query("orderBy")
//       .optional()
//       .trim()
//       .isIn(["asc", "desc"])
//       .withMessage("Invalid sort order"),
//   ],
//   (req, res) => {
//     const { sortBy, orderBy, title } = req.query;
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     let query = "SELECT * FROM movies";
//     if (title) {
//       query += ` WHERE title = '${title}'`;
//     }
//     if (sortBy && orderBy) {
//       query += ` ORDER BY ${sortBy} ${orderBy}`;
//     }
//     pool.getConnection((err, connection) => {
//       if (err) throw err;
//       connection.query(query, (err, rows) => {
//         connection.release();
//         if (!err) {
//           return res.status(200).json({ data: rows });
//         } else {
//           return res.status(500).json({ error: err });
//         }
//       });
//     });
//   }
// );

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

    pool.getConnection((err, connection) => {
      if (err) {
        console.log("DB ERROR:", err);
        return res.status(500).json({ error: "Tidak bisa konek ke db" });
      }

      // Cek apakah movie dengan ID tersebut ada
      const findQuery = "SELECT * FROM movies WHERE id = ?";
      connection.query(findQuery, [id], (err, results) => {
        if (err) {
          console.log("Error query:", err);
          connection.release();
          return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
          console.log("Movie tidak ada yang memiliki id:", id);
          connection.release();
          return res.status(404).json({ error: "Film tida ditemukan" });
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
