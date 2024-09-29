const express = require("express");

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

// kode utk run dipostman
app.get("/", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("SELECT * from movies", (err, rows) => {
      connection.release(); // return the connection to pool
      if (!err) {
        res.status(200).json({ data: rows });
      } else {
        res.status(500).json({ error: err });
      }
    });
  });
});

// dapat data dari database pakai id
app.get("/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "SELECT * FROM movies WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        connection.release(); // return the connection to pool
        if (!err) {
          res.status(200).json({ data: rows });
        } else {
          res.status(500).json({ error: err });
        }
      }
    );
  });
});

// Delete Movie by Id (method DELETE)

app.delete("/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "DELETE FROM movies WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        connection.release(); // return the connection to pool
        if (!err) {
          res.status(200).json({ data: rows });
        } else {
          res.status(500).json({ error: err });
        }
      }
    );
  });
});

// insert data
app.post("/", jsonParser, (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const params = req.body;
    connection.query("INSERT INTO movies SET ?", params, (err, rows) => {
      connection.release(); // return the connection to pool
      if (!err) {
        res.status(200).json({ data: rows });
      } else {
        res.status(500).json({ error: err });
      }
    });
  });
});

// put update

app.put("/:id", jsonParser, (req, res) => {
  console.log(req);
  const { id } = req.params;
  const params = req.body;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const fields = [];
    const values = [];
    for (const key in params) {
      fields.push(`${key} = ?`);
      values.push(params[key]);
    }
    const query = `UPDATE movies SET ${fields.join(", ")} WHERE id = ?`;
    values.push(Number(id));
    connection.query(query, values, (err, rows) => {
      connection.release(); // return the connection to pool
      console.log(err);
      if (!err) {
        res.status(200).json({ data: rows });
      } else {
        return res.status(500).json({ error: err });
      }
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
