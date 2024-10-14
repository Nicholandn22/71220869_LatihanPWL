const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const mysql = require("mysql");

app.use(cors());

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "71220869",
});

app.get("/buku", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;

    connection.query("select * from buku", (err, rows) => {
      connection.release();

      if (!err) {
        res.status(200).json({ data: rows });
      } else {
        res.status(500).json({ data: rows });
      }
    });
  });
});

// ini pke id
app.get("/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;

    connection.query(
      "select * from buku where id = ?",
      [req.params.id],
      (err, rows) => {
        connection.release();

        if (!err) {
          res.status(200).json({ data: rows });
        } else {
          res.status(500).json({ data: rows });
        }
      }
    );
  });
});

// ini post
app.post("/", jsonParser, (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const params = req.body; // Mengambil data dari body
    connection.query("insert into buku set ?", params, (err, rows) => {
      connection.release();

      if (!err) {
        res.status(200).json({ data: rows });
      } else {
        res.status(500).json({ error: err.message });
      }
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
