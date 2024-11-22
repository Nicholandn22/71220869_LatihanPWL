const table = document.getElementById("tableBody");

// ambil data transaksi dari server
const getTransaction = async () => {
  try {
    const response = await fetch("http://localhost:3000/transaksi");
    if (!response.ok) throw new Error("Network response was not ok");
    const result = await response.json();
    return result.data; // Kembalikan data transaksi
  } catch (error) {
    console.error("Gagal mengambil data transaksi:", error);
    return []; // Kembalikan array kosong jika terjadi kesalahan
  }
};

// Fungsi untuk merender transaksi ke dalam tabel
const renderTransaction = (transactions) => {
  table.innerHTML = ""; // Kosongkan tabel sebelum render ulang
  transactions.forEach((transaction) => {
    const row = document.createElement("tr");

    const ketCell = document.createElement("td");
    ketCell.textContent = transaction.keterangan;
    row.appendChild(ketCell);

    const tangCell = document.createElement("td");
    tangCell.textContent = transaction.tanggal;
    row.appendChild(tangCell);

    const nomCell = document.createElement("td");
    nomCell.textContent = transaction.nominal;
    row.appendChild(nomCell);

    const salCell = document.createElement("td");
    salCell.textContent = transaction.saldo;
    row.appendChild(salCell);

    table.appendChild(row);
  });
};

// fungsi untuk menangani pencarian transaksi
const searchTransactions = (transactions) => {
  const searchTerm = document.getElementById("search").value.toLowerCase();
  const filteredTransactions = transactions.filter((transaction) => {
    return (
      transaction.keterangan.toLowerCase().includes(searchTerm) ||
      transaction.nominal.toString().includes(searchTerm) ||
      transaction.tanggal.toString().includes(searchTerm)
    );
  });
  renderTransaction(filteredTransactions); // tampilin hasil pencarian
};

// fungsi untuk menambahkan transaksi
const addTransaction = async (keterangan) => {
  const nominalInput = document.getElementById("nominal");
  const tanggalInput = document.getElementById("tanggal");
  const nominal = parseFloat(nominalInput.value);
  const tanggal = tanggalInput.value;

  // cek dlu nominal ma tanggal hrus ada isi
  if (!nominal || !tanggal) { 
    alert("Nominal dan tanggal harus diisi!");
    return;
  }

  // ambil saldo terbaru dari transaksi terdekat
  const transaksi = await getTransaction();
  let saldoTerakhir = transaksi.length > 0 ? transaksi[0].saldo : 0;

  const saldo =
    keterangan === "Tarik"
      ? saldoTerakhir - nominal
      : saldoTerakhir + nominal;

  const response = await fetch("http://localhost:3000/transaksi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      keterangan,
      nominal,
      tanggal,
      saldo,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    alert(data.message);
    nominalInput.value = "";
    tanggalInput.value = "";
    const transaksiBaru = await getTransaction();
    renderTransaction(transaksiBaru);
  } else {
    alert("gagal menambahkan transaksi, periksa lagi");
  }
};

window.onload = async () => {
  // ambil transaksi saat halaman dimuat
  const transactions = await getTransaction();
  renderTransaction(transactions);

  // tambahkan event listener pada tombol
  document.getElementById("TarikButton").onclick = () => {
    addTransaction("Tarik");
  };
  document.getElementById("SetorButton").onclick = () => {
    addTransaction("Setor");
  };

  // tambahkan event listener untuk pencarian
  document.getElementById("search").addEventListener("input", () => {
    searchTransactions(transactions);
  });
};
