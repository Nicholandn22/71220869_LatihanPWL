

const transactionId = document.getElementById("container");

const table = document.getElementById("tableBody");
// const form = document.getElementById("container");

const tButton = document.getElementById("TarikButton") ;
const sButton = document.getElementById("SetorButton") ;

const getTransaction = async () => {
    const response = await fetch("http://localhost:3000/transaksi");
    const result = await response.json();
    return result.data;
}

const renderTransaction = (transaksi) => {
    transaksi.map((transaction) =>{
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

tButton.onclick = async () =>{

}


window.onload = async () =>{
    const transaksi = await getTransaction();
    renderTransaction(transaksi);
};