<!DOCTYPE html>
<html lang="id" data-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sistem Manajemen Mahasiswa</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Fira+Code:wght@500&display=swap" rel="stylesheet">
<style>
  /* ═══════════════════════════════════════════
     CSS VARIABLES & RESET
  ═══════════════════════════════════════════ */
  :root {
    --transition: 0.3s ease;
    --radius-lg: 16px;
    --radius-md: 10px;
    --radius-sm: 6px;
  }

  [data-theme="light"] {
    --bg-color: #f8fafc;
    --card-bg: #ffffff;
    --border-clr: #e2e8f0;
    --text-main: #0f172a;
    --text-muted: #64748b;
    --primary: #0284c7;
    --primary-hover: #0369a1;
    --danger: #e11d48;
    --warning: #d97706;
    --success: #16a34a;
    --input-bg: #f1f5f9;
    --table-hover: #f1f5f9;
  }

  [data-theme="dark"] {
    --bg-color: #0f172a;
    --card-bg: #1e293b;
    --border-clr: #334155;
    --text-main: #f8fafc;
    --text-muted: #94a3b8;
    --primary: #38bdf8;
    --primary-hover: #7dd3fc;
    --danger: #fb7185;
    --warning: #fbbf24;
    --success: #4ade80;
    --input-bg: #0f172a;
    --table-hover: #334155;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: var(--bg-color);
    color: var(--text-main);
    transition: background-color var(--transition), color var(--transition);
    line-height: 1.5;
    padding: 2rem 1rem;
    min-height: 100vh;
  }

  /* ═══════════════════════════════════════════
     LOGIN SECTION
  ═══════════════════════════════════════════ */
  .login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
  }

  .login-card {
    width: 100%;
    max-width: 400px;
    text-align: center;
    padding: 2rem;
  }

  .login-card h2 {
    color: var(--primary);
    margin-bottom: 0.5rem;
  }

  .login-card p {
    color: var(--text-muted);
    font-size: 0.9rem;
    margin-bottom: 2rem;
  }

  /* ═══════════════════════════════════════════
     LAYOUT UTAMA (DASHBOARD)
  ═══════════════════════════════════════════ */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 1.5rem;
  }

  header {
    max-width: 1200px;
    margin: 0 auto 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--card-bg);
    padding: 1rem 1.5rem;
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-clr);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .brand h1 { font-size: 1.25rem; font-weight: 700; color: var(--primary); }
  .brand p { font-size: 0.85rem; color: var(--text-muted); }

  .header-actions { display: flex; gap: 0.75rem; }
  
  .btn {
    padding: 0.6rem 1.2rem;
    border-radius: var(--radius-sm);
    border: none;
    font-family: inherit;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .btn-outline {
    background: transparent;
    border: 1px solid var(--border-clr);
    color: var(--text-main);
  }
  .btn-outline:hover { border-color: var(--primary); color: var(--primary); }

  .btn-primary { background: var(--primary); color: #fff; }
  .btn-primary:hover { background: var(--primary-hover); }

  .btn-danger { background: var(--danger); color: #fff; }
  .btn-danger:hover { opacity: 0.9; }

  /* ═══════════════════════════════════════════
     CARDS & FORMS
  ═══════════════════════════════════════════ */
  .card {
    background: var(--card-bg);
    border: 1px solid var(--border-clr);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .card-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .form-group { margin-bottom: 1.2rem; text-align: left; }
  .form-group label {
    display: block;
    font-size: 0.85rem;
    font-weight: 500;
    margin-bottom: 0.4rem;
    color: var(--text-muted);
  }

  input[type="text"], input[type="password"], textarea, select {
    width: 100%;
    padding: 0.7rem 1rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--border-clr);
    background: var(--input-bg);
    color: var(--text-main);
    font-family: inherit;
    font-size: 0.9rem;
    transition: border 0.2s;
  }
  input:focus, textarea:focus, select:focus {
    outline: none;
    border-color: var(--primary);
  }

  textarea { resize: vertical; min-height: 80px; }

  /* Radio Styling */
  .radio-container { display: flex; gap: 1rem; }
  .radio-box { flex: 1; position: relative; }
  .radio-box input { display: none; }
  .radio-box label {
    display: block;
    text-align: center;
    padding: 0.7rem;
    border: 1px solid var(--border-clr);
    border-radius: var(--radius-md);
    cursor: pointer;
    font-weight: 500;
    color: var(--text-muted);
    transition: all 0.2s;
    margin: 0;
  }
  .radio-box input:checked + label {
    border-color: var(--primary);
    background: rgba(56, 189, 248, 0.1);
    color: var(--primary);
  }

  .form-actions { display: flex; gap: 0.5rem; margin-top: 1.5rem; }
  .form-actions .btn { flex: 1; }

  .mode-badge {
    display: none;
    background: rgba(251, 191, 36, 0.15);
    color: var(--warning);
    padding: 0.5rem;
    border-radius: var(--radius-md);
    font-size: 0.8rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 1rem;
    border: 1px solid rgba(251, 191, 36, 0.3);
  }
  .mode-badge.active { display: block; }

  /* ═══════════════════════════════════════════
     TABLE & SEARCH
  ═══════════════════════════════════════════ */
  .toolbar {
    display: flex; gap: 1rem; margin-bottom: 1.5rem;
  }
  
  .search-box { flex: 1; display: flex; gap: 0.5rem; }
  .search-box input { flex: 1; }
  .search-box select { width: 130px; }

  .table-responsive { overflow-x: auto; }

  table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
  th, td { padding: 1rem; text-align: left; border-bottom: 1px solid var(--border-clr); }
  th { background: var(--input-bg); font-weight: 600; color: var(--text-muted); white-space: nowrap; }
  tbody tr { transition: background 0.2s; }
  tbody tr:hover { background: var(--table-hover); }

  .code-font { font-family: 'Fira Code', monospace; color: var(--primary); }

  .badge { padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.75rem; font-weight: 600; }
  .badge-L { background: rgba(56, 189, 248, 0.15); color: #38bdf8; }
  .badge-P { background: rgba(251, 113, 133, 0.15); color: #fb7185; }

  .action-btns { display: flex; gap: 0.4rem; }
  .btn-sm { padding: 0.4rem 0.8rem; font-size: 0.75rem; }
  .btn-edit { background: rgba(251, 191, 36, 0.15); color: var(--warning); }
  .btn-del { background: rgba(225, 29, 72, 0.15); color: var(--danger); }

  mark { background: rgba(56, 189, 248, 0.3); color: inherit; border-radius: 2px; }

  /* ═══════════════════════════════════════════
     PAGINATION
  ═══════════════════════════════════════════ */
  .pagination {
    display: flex; justify-content: space-between; align-items: center;
    margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-clr);
  }
  .page-info { font-size: 0.85rem; color: var(--text-muted); }
  .page-controls { display: flex; gap: 0.4rem; }
  .page-item {
    width: 32px; height: 32px; display: flex; justify-content: center; align-items: center;
    border-radius: var(--radius-sm); border: 1px solid var(--border-clr);
    background: var(--input-bg); cursor: pointer; font-size: 0.85rem;
    font-weight: 500; transition: all 0.2s;
  }
  .page-item:hover:not(:disabled) { border-color: var(--primary); color: var(--primary); }
  .page-item.active { background: var(--primary); color: #fff; border-color: var(--primary); }
  .page-item:disabled { opacity: 0.5; cursor: not-allowed; }

  /* ═══════════════════════════════════════════
     RESPONSIVE
  ═══════════════════════════════════════════ */
  @media (max-width: 900px) {
    .container { grid-template-columns: 1fr; }
    header { flex-direction: column; gap: 1rem; text-align: center; }
    .header-actions { flex-wrap: wrap; justify-content: center; }
  }
</style>
</head>
<body>

  <div id="loginSection" class="login-wrapper">
    <div class="card login-card">
      <h2>🔑 Sistem Akademik</h2>
      <p>Silakan login untuk kelola data mahasiswa</p>
      
      <form id="formLogin" onsubmit="event.preventDefault(); prosesLogin();">
        <div class="form-group">
          <label>Username</label>
          <input type="text" id="username" placeholder="Masukkan username" required>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" id="passwordLogin" placeholder="Masukkan password" required>
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Login Masuk</button>
      </form>
    </div>
  </div>


  <div id="dashboardSection" style="display: none;">
    
    <header>
      <div class="brand">
        <h1>Sistem Akademik</h1>
        <p>Manajemen Data Mahasiswa</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-outline" id="themeToggle" onclick="toggleTheme()">🌙 Dark Mode</button>
        <button class="btn btn-primary" onclick="exportData()">⬇ Export CSV</button>
        <button class="btn btn-danger" onclick="prosesLogout()">Keluar</button>
      </div>
    </header>

    <main class="container">
      
      <section class="card">
        <div class="card-title">
          <span>Form Mahasiswa</span>
        </div>

        <div class="mode-badge" id="editBadge">
          ⚠️ Mode Edit Aktif - <a href="#" onclick="batalEdit()" style="color:inherit">Batal</a>
        </div>

        <form id="formMahasiswa" onsubmit="event.preventDefault(); simpanData();">
          <div class="form-group">
            <label>Nomor Induk Mahasiswa (NIM)</label>
            <input type="text" id="nim" placeholder="Masukkan NIM" required>
          </div>

          <div class="form-group">
            <label>Nama Lengkap</label>
            <input type="text" id="nama" placeholder="Masukkan Nama Lengkap" required>
          </div>

          <div class="form-group">
            <label>Alamat Domisili</label>
            <textarea id="alamat" placeholder="Masukkan Alamat Lengkap" required></textarea>
          </div>

          <div class="form-group">
            <label>Jenis Kelamin</label>
            <div class="radio-container">
              <div class="radio-box">
                <input type="radio" id="jk-l" name="jk" value="Laki-laki" required>
                <label for="jk-l">Laki-laki</label>
              </div>
              <div class="radio-box">
                <input type="radio" id="jk-p" name="jk" value="Perempuan">
                <label for="jk-p">Perempuan</label>
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary" id="btnSimpan">Simpan Data</button>
            <button type="button" class="btn btn-outline" onclick="resetForm()">Reset</button>
          </div>
        </form>
      </section>

      <section class="card">
        <div class="card-title">
          <span>Data Mahasiswa</span>
          <span style="font-size:0.85rem; color:var(--text-muted)">Total: <span id="totalData">0</span></span>
        </div>

        <div class="toolbar">
          <div class="search-box">
            <input type="text" id="searchInput" placeholder="Cari data..." oninput="onSearch()">
            <select id="filterSearch" onchange="onSearch()">
              <option value="all">Semua Kolom</option>
              <option value="nim">Cari NIM</option>
              <option value="nama">Cari Nama</option>
            </select>
          </div>
          <select id="limitData" onchange="changeLimit()" style="width: auto;">
            <option value="5">5 / Hal</option>
            <option value="10" selected>10 / Hal</option>
          </select>
        </div>

        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>NIM</th>
                <th>Nama Lengkap</th>
                <th>Jenis Kelamin</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody id="dataTable">
              </tbody>
          </table>
        </div>

        <div class="pagination">
          <div class="page-info" id="pageInfo">Menampilkan 0 data</div>
          <div class="page-controls" id="pageControls">
            </div>
        </div>
      </section>

    </main>
  </div>


<script>
  /* ═══════════════════════════════════════════
     SISTEM LOGIN SEDERHANA
  ═══════════════════════════════════════════ */
  function cekSesiLogin() {
    // Cek apakah user udah login (simpan di sessionStorage)
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      document.getElementById('loginSection').style.display = 'none';
      document.getElementById('dashboardSection').style.display = 'block';
      onSearch(); // Render tabel pas masuk
    } else {
      document.getElementById('loginSection').style.display = 'flex';
      document.getElementById('dashboardSection').style.display = 'none';
    }
  }

  function prosesLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('passwordLogin').value;

    // Kredensial Hardcode (Sesuai contoh fitur login sederhana)
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

  // Panggil cek sesi saat halaman pertama kali dibuka
  cekSesiLogin();


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

  // Load saved theme
  const savedTheme = localStorage.getItem('theme_mhs') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  document.getElementById('themeToggle').textContent = savedTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';

  /* ═══════════════════════════════════════════
     FITUR TAMBAHAN 2: EXPORT CSV
  ═══════════════════════════════════════════ */
  function exportData() {
    if (mahasiswas.length === 0) { alert('Tidak ada data untuk di-export!'); return; }
    
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
        alert("NIM sudah terdaftar!"); return;
      }
      mahasiswas.push(newData);
    } else {
      // Update
      const duplikat = mahasiswas.some((m, i) => m.nim === nim && i !== editIndex);
      if (duplikat) { alert("NIM sudah digunakan!"); return; }
      mahasiswas[editIndex] = newData;
      batalEdit();
    }

    localStorage.setItem('data_mhs', JSON.stringify(mahasiswas));
    resetForm();
    onSearch(); // Render ulang
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
    if(editIndex === -1) {
      document.getElementById('btnSimpan').textContent = 'Simpan Data';
    }
  }

  /* ═══════════════════════════════════════════
     PENCARIAN & HIGHLIGHT
  ═══════════════════════════════════════════ */
  function onSearch() {
    // Kalau belum login, jangan render tabelnya
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

    // Hitung halaman
    const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageData = filteredData.slice(start, end);

    // Tulis ke tabel
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

    // Info Pagination
    const infoEnd = Math.min(end, filteredData.length);
    document.getElementById('pageInfo').textContent = 
      filteredData.length > 0 ? `Menampilkan ${start + 1} - ${infoEnd} dari ${filteredData.length} data` : 'Menampilkan 0 data';

    // Render Tombol Pagination
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

</script>

</body>
</html>
