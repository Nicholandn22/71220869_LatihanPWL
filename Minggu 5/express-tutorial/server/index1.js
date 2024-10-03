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

// put update
app.put(
  "/:id",
  [
    body("title")
      .isString()
      .withMessage("Title must be a string") // Memastikan title adalah string
      .notEmpty()
      .withMessage("Title is required") // Validasi agar tidak kosong
      .matches(/^[A-Za-z\s]+$/)
      .withMessage("Title can only contain letters and spaces"), // Validasi agar hanya huruf dan spasi
    body("genre").notEmpty().withMessage("Genre is required"), // Validasi genre dari body
    body("release_year")
      .isInt({ min: 1888, max: 2024 })
      .withMessage("Release year must be between 1888 and 2024"), // Validasi release_year dari body
  ],
  jsonParser,
  (req, res) => {
    // Mengecek hasil validasi
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Return jika ada error validasi
    }

    const { id } = req.params; // Ambil id dari parameter URL
    const params = req.body; // Ambil data dari body request

    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({ error: "Error connecting to database" });
      }

      // Membuat query dynamic
      const fields = [];
      const values = [];
      for (const key in params) {
        fields.push(`${key} = ?`);
        values.push(params[key]);
      }

      const query = `UPDATE movies SET ${fields.join(", ")} WHERE id = ?`;
      values.push(Number(id));

      // Menjalankan query update
      connection.query(query, values, (err, rows) => {
        connection.release(); // Kembalikan koneksi ke pool
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (rows.affectedRows === 0) {
          return res.status(404).json({ error: "Movie not found" }); // Jika tidak ada data yang diupdate
        }
        res.status(200).json({ data: rows });
      });
    });
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
