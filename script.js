// ARRAY & OBJECT
let reports = JSON.parse(localStorage.getItem("reports")) || [];

//EDIT ID
let editId = null;

// FILTER AKTIF
let activeFilter = "semua";

// EVENT DOM
document.getElementById("submitReport").addEventListener("click", tambahData);
document.getElementById("search").addEventListener("keyup", cariData);

// FUNCTION TAMBAH DATA
function tambahData() {
  let barang = document.getElementById("inputBarang").value;
  let orang = document.getElementById("inputNama").value;
  let lokasi = document.getElementById("inputLokasi").value;
  let status = document.getElementById("inputStatus").value;
  let ciri = document.getElementById("inputCiri").value;
  let waktu = document.getElementById("inputWaktu").value;

  if (
    barang === "" ||
    orang === "" ||
    lokasi === "" ||
    status === "" ||
    ciri === "" ||
    waktu === ""
  ) {
    alert("Semua input harus diisi!");
    return;
  }

  // STRING
  barang = barang.toUpperCase();
  orang = orang.toUpperCase();

  let date = new Date().toLocaleDateString();

  if (editId !== null) {
    let lapor = reports.find((r) => r.id === editId);

    lapor.barang = barang;
    lapor.orang = orang;
    lapor.lokasi = lokasi;
    lapor.status = status;
    lapor.ciri = ciri;
    lapor.waktu = waktu;

    editId = null;

    tampilData();
    saveToLocalStorage();
    resetForm();
    showToast("Laporan berhasil diperbarui ✍🏻");
  } else {
    let id = Math.floor(Math.random() * 1000);

    let lapor = {
      id: id,
      barang: barang,
      orang: orang,
      lokasi: lokasi,
      status: status,
      ciri: ciri,
      waktu: waktu,
      date: date,
    };

    reports.push(lapor);

    tampilData();
    saveToLocalStorage();
    resetForm();
    showToast("Laporan berhasil ditambahkan 👏🏻");
  }
}

// MENAMPILKAN DATA
function tampilData() {
  let container = document.getElementById("laporan");
  container.innerHTML = "";

  let filtered =
    activeFilter === "semua"
      ? reports
      : reports.filter((r) => r.status === activeFilter);

  filtered.forEach((item) => {
    let statusBarang =
      item.status === "Ditemukan" ? "status-ditemukan" : "status-hilang";

    container.innerHTML += `
      <div class="report-card">
        <h3>${item.barang}</h3>
        <p class="statusBarang ${statusBarang}">${item.status}</p>
        <p>Nama: ${item.orang}</p>
        <p>Lokasi: ${item.lokasi}</p>
        <p>Ciri: ${item.ciri}</p>
        <p>Waktu: ${item.waktu}</p>
        <div class="action-btn">
          <button class="edit-btn" onclick="editData(${item.id})">Edit</button>
          <button class="delete-btn" onclick="hapusData(${item.id})">Hapus</button>
        </div>
      </div>
    `;
  });
}

// FILTER DATA
function filterData(status, el) {
  activeFilter = status;
  document
    .querySelectorAll(".filter-chip")
    .forEach((c) => c.classList.remove("active"));
  el.classList.add("active");
  tampilData();
}

// EDIT DATA
function editData(id) {
  editId = id;

  let lapor = reports.find((r) => r.id === id);

  document.getElementById("inputBarang").value = lapor.barang;
  document.getElementById("inputNama").value = lapor.orang;
  document.getElementById("inputLokasi").value = lapor.lokasi;
  document.getElementById("inputStatus").value = lapor.status;
  document.getElementById("inputCiri").value = lapor.ciri;
  document.getElementById("inputWaktu").value = lapor.waktu;
}

// HAPUS DATA
function hapusData(id) {
  let konfirmasi = confirm("Yakin laporan dihapus?");
  if (konfirmasi) {
    reports = reports.filter((r) => r.id !== id);
    tampilData();
    saveToLocalStorage();
    showToast("Laporan berhasil dihapus 🗑️");
  }
}

// RESET FORM
function resetForm() {
  document.getElementById("inputBarang").value = "";
  document.getElementById("inputNama").value = "";
  document.getElementById("inputLokasi").value = "";
  document.getElementById("inputStatus").value = "";
  document.getElementById("inputCiri").value = "";
  document.getElementById("inputWaktu").value = "";
}

// SAVE KE LOCAL STORAGE
function saveToLocalStorage() {
  console.log(reports);
  localStorage.setItem("reports", JSON.stringify(reports));
}

tampilData();

// SEARCH
function cariData() {
  let keyword = document.getElementById("search").value.toUpperCase();
  let container = document.getElementById("laporan");

  container.innerHTML = "";

  let filtered =
    activeFilter === "semua"
      ? reports
      : reports.filter((r) => r.status === activeFilter);

  filtered.forEach((item) => {
    if (item.barang.includes(keyword)) {
      let statusBarang =
        item.status === "Ditemukan" ? "status-ditemukan" : "status-hilang";

      container.innerHTML += `
        <div class="report-card">
          <h3>${item.barang}</h3>
          <p class="statusBarang ${statusBarang}">${item.status}</p>
          <p>Nama: ${item.orang}</p>
          <p>Lokasi: ${item.lokasi}</p>
          <p>Ciri: ${item.ciri}</p>
          <p>Waktu: ${item.waktu}</p>
          <div class="action-btn">
            <button class="edit-btn" onclick="editData(${item.id})">Edit</button>
            <button class="delete-btn" onclick="hapusData(${item.id})">Hapus</button>
          </div>
        </div>
      `;
    }
  });
}

//ALERT TOAST KANAN BAWAH
function showToast(message) {
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}
