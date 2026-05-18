/* ═══════════════════════════════════════════
   SISTEM LOGIN SEDERHANA
═══════════════════════════════════════════ */
function cekSesiLogin() {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  if (isLoggedIn === 'true') {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('dashboardSection').style.display = 'block';
    onSearch();
  } else {
    document.getElementById('loginSection').style.display = 'flex';
    document.getElementById('dashboardSection').style.display = 'none';
  }
}

function prosesLogin() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('passwordLogin').value;

  if (user === 'admin' && pass === 'admin123') {
    sessionStorage.setItem('isLoggedIn', 'true');
    cekSesiLogin();
  } else {
    alert('Username atau password salah! (Coba: admin / admin123)');
  }
}

function prosesLogout() {
  sessionStorage.removeItem('isLoggedIn');
  document.getElementById('formLogin').reset();
  cekSesiLogin();
}

/* ═══════════════════════════════════════════
   STATE MANAGEMENT CRUD
═══════════════════════════════════════════ */
let mahasiswas = JSON.parse(localStorage.getItem('data_mhs')) || [];
let editIndex = -1;
let currentPage = 1;
let itemsPerPage = 10;
let filteredData = [];

/* ═══════════════════════════════════════════
   FITUR TAMBAHAN 1: THEME TOGGLE
═══════════════════════════════════════════ */
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.getElementById('themeToggle').textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
  localStorage.setItem('theme_mhs', isDark ? 'light' : 'dark');
}

/* ═══════════════════════════════════════════
   FITUR TAMBAHAN 2: EXPORT CSV
═══════════════════════════════════════════ */
function exportData() {
  if (mahasiswas.length === 0) {
    alert('Tidak ada data untuk di-export!');
    return;
  }

  let csvContent = "No,NIM,Nama Lengkap,Alamat,Jenis Kelamin\n";
  mahasiswas.forEach((m, i) => {
    let row = `${i + 1},"${m.nim}","${m.nama}","${m.alamat.replace(/"/g, '""')}","${m.jk}"`;
    csvContent += row + "\n";
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Data_Mahasiswa.csv";
  link.click();
}

/* ═══════════════════════════════════════════
   CRUD LOGIC
═══════════════════════════════════════════ */
function simpanData() {
  const nim = document.getElementById('nim').value.trim();
  const nama = document.getElementById('nama').value.trim();
  const alamat = document.getElementById('alamat').value.trim();
  const jk = document.querySelector('input[name="jk"]:checked').value;

  const newData = { nim, nama, alamat, jk };

  if (editIndex === -1) {
    // Create
    if (mahasiswas.some(m => m.nim === nim)) {
      alert("NIM sudah terdaftar!");
      return;
    }
    mahasiswas.push(newData);
  } else {
    // Update
    const duplikat = mahasiswas.some((m, i) => m.nim === nim && i !== editIndex);
    if (duplikat) {
      alert("NIM sudah digunakan!");
      return;
    }
    mahasiswas[editIndex] = newData;
    batalEdit();
  }

  localStorage.setItem('data_mhs', JSON.stringify(mahasiswas));
  resetForm();
  onSearch();
}

function hapusData(nim) {
  if (confirm('Yakin ingin menghapus data mahasiswa ini?')) {
    mahasiswas = mahasiswas.filter(m => m.nim !== nim);
    localStorage.setItem('data_mhs', JSON.stringify(mahasiswas));
    onSearch();
  }
}

function editData(nim) {
  const index = mahasiswas.findIndex(m => m.nim === nim);
  if (index === -1) return;

  editIndex = index;
  const m = mahasiswas[index];

  document.getElementById('nim').value = m.nim;
  document.getElementById('nama').value = m.nama;
  document.getElementById('alamat').value = m.alamat;

  if (m.jk === 'Laki-laki') document.getElementById('jk-l').checked = true;
  else document.getElementById('jk-p').checked = true;

  document.getElementById('editBadge').classList.add('active');
  document.getElementById('btnSimpan').textContent = 'Update Data';
}

function batalEdit() {
  editIndex = -1;
  document.getElementById('editBadge').classList.remove('active');
  document.getElementById('btnSimpan').textContent = 'Simpan Data';
  resetForm();
}

function resetForm() {
  document.getElementById('formMahasiswa').reset();
  if (editIndex === -1) {
    document.getElementById('btnSimpan').textContent = 'Simpan Data';
  }
}

/* ═══════════════════════════════════════════
   PENCARIAN & HIGHLIGHT
═══════════════════════════════════════════ */
function onSearch() {
  if (sessionStorage.getItem('isLoggedIn') !== 'true') return;

  const query = document.getElementById('searchInput').value.toLowerCase().trim();
  const filter = document.getElementById('filterSearch').value;

  if (!query) {
    filteredData = [...mahasiswas];
  } else {
    filteredData = mahasiswas.filter(m => {
      if (filter === 'nim') return m.nim.toLowerCase().includes(query);
      if (filter === 'nama') return m.nama.toLowerCase().includes(query);
      return m.nim.toLowerCase().includes(query) || m.nama.toLowerCase().includes(query);
    });
  }

  currentPage = 1;
  renderTable();
}

function highlightText(text, query, fieldType) {
  if (!query) return text;
  const filter = document.getElementById('filterSearch').value;

  if (filter !== 'all' && filter !== fieldType) return text;

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.toString().split(regex).map((part, i) =>
    i % 2 === 0 ? part : `<mark>${part}</mark>`
  ).join('');
}

/* ═══════════════════════════════════════════
   PAGINATION & RENDER TAMPILAN
═══════════════════════════════════════════ */
function changeLimit() {
  itemsPerPage = parseInt(document.getElementById('limitData').value);
  currentPage = 1;
  renderTable();
}

function renderTable() {
  const tbody = document.getElementById('dataTable');
  const query = document.getElementById('searchInput').value.trim();
  document.getElementById('totalData').textContent = mahasiswas.length;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageData = filteredData.slice(start, end);

  if (pageData.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 2rem;">Tidak ada data ditemukan</td></tr>`;
  } else {
    tbody.innerHTML = pageData.map((m, i) => {
      const badgeClass = m.jk === 'Laki-laki' ? 'badge-L' : 'badge-P';
      return `
        <tr>
          <td style="color:var(--text-muted)">${start + i + 1}</td>
          <td class="code-font">${highlightText(m.nim, query, 'nim')}</td>
          <td style="font-weight:500">${highlightText(m.nama, query, 'nama')}</td>
          <td><span class="badge ${badgeClass}">${m.jk}</span></td>
          <td class="action-btns">
            <button class="btn btn-sm btn-outline btn-edit" onclick="editData('${m.nim}')">Edit</button>
            <button class="btn btn-sm btn-outline btn-del" onclick="hapusData('${m.nim}')">Hapus</button>
          </td>
        </tr>
      `;
    }).join('');
  }

  const infoEnd = Math.min(end, filteredData.length);
  document.getElementById('pageInfo').textContent =
    filteredData.length > 0
      ? `Menampilkan ${start + 1} - ${infoEnd} dari ${filteredData.length} data`
      : 'Menampilkan 0 data';

  const controls = document.getElementById('pageControls');
  let btns = `<button class="page-item" onclick="goPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>&laquo;</button>`;

  for (let p = 1; p <= totalPages; p++) {
    btns += `<button class="page-item ${p === currentPage ? 'active' : ''}" onclick="goPage(${p})">${p}</button>`;
  }

  btns += `<button class="page-item" onclick="goPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>&raquo;</button>`;
  controls.innerHTML = btns;
}

function goPage(page) {
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderTable();
}

/* ═══════════════════════════════════════════
   INIT — Jalankan saat halaman dimuat
═══════════════════════════════════════════ */
const savedTheme = localStorage.getItem('theme_mhs') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
document.getElementById('themeToggle').textContent = savedTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';

cekSesiLogin();
