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
  database: "uts_pwl",
  port: 3307,
});

// Mengambil semua transaksi dan mengurutkan berdasarkan tanggal dari yang terlama ke terbaru
app.get("/transaksi", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;

    connection.query(
      "SELECT * FROM transaksi",
      (err, rows) => {
        connection.release();

        if (!err) {
          res.status(200).json({ data: rows });
        } else {
          res.status(500).json({ message: "Gagal mengambil transaksi" });
        }
      }
    );
  });
});

// Menambahkan transaksi
app.post("/transaksi", jsonParser, (req, res) => {
  const { keterangan, nominal, tanggal } = req.body;

  // Ambil semua transaksi untuk menghitung saldo
  pool.getConnection((err, connection) => {
    if (err) throw err;

    // Mengambil semua transaksi yang ada dan menghitung saldo
    connection.query(
      "SELECT * FROM transaksi ",
      (err, rows) => {
        if (err) {
          connection.release();
          return res.status(500).json({ message: "Gagal mengambil transaksi" });
        }

        let saldoTerakhir = 0;

        // Hitung saldo berdasarkan semua transaksi yang ada
        for (const row of rows) {
          saldoTerakhir +=
            row.keterangan === "Setor" ? row.nominal : -row.nominal;
        }

        // Update saldo berdasarkan jenis transaksi
        const saldoBaru =
          keterangan === "Setor"
            ? saldoTerakhir + nominal
            : saldoTerakhir - nominal;

        // Cek untuk memastikan saldo tidak negatif saat penarikan
        if (keterangan === "Tarik" && saldoTerakhir < nominal) {
          connection.release();
          return res
            .status(400)
            .json({ message: "Saldo tidak mencukupi untuk penarikan" });
        }

        const query = `
        INSERT INTO transaksi (keterangan, nominal, tanggal, saldo)
        VALUES (?, ?, ?, ?)
      `;

        connection.query(
          query,
          [keterangan, nominal, tanggal, saldoBaru],
          (err, result) => {
            connection.release();

            if (!err) {
              res
                .status(200)
                .json({ message: "Transaksi berhasil ditambahkan" });
            } else {
              console.error(err);
              res.status(500).json({ message: "Gagal menambahkan transaksi" });
            }
          }
        );
      }
    );
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
