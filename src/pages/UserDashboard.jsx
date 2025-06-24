import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = () => {
  const [reports, setReports] = useState([]);
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [kategori, setKategori] = useState('');
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [alert, setAlert] = useState({ type: '', message: '' });

  // Ambil semua laporan
  const fetchReports = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/reports');
      setReports(res.data.data || []);
    } catch (err) {
      console.error('Gagal mengambil laporan:', err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: '', message: '' }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/reports/${editId}`, {
          judul,
          deskripsi,
          kategori,
        });
        showAlert('success', 'Laporan diperbarui!');
      } else {
        await axios.post('http://localhost:5000/api/reports', {
          judul,
          deskripsi,
          kategori,
        });
        showAlert('success', 'Laporan dikirim!');
      }
      resetForm();
      setShowForm(false);
      fetchReports();
    } catch (err) {
      console.error(err);
      showAlert('error', 'Gagal menyimpan laporan.');
    }
  };

  const resetForm = () => {
    setJudul('');
    setDeskripsi('');
    setKategori('');
    setEditId(null);
  };

  const handleEdit = (report) => {
    setJudul(report.judul || report.title);
    setDeskripsi(report.deskripsi || report.description);
    setKategori(report.kategori || '');
    setEditId(report._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
  console.log('Hapus ID:', id);
  try {
    await axios.delete(`http://localhost:5000/api/reports/${id}`);
    fetchReports();
    showAlert('success', 'Laporan dihapus!');
  } catch (err) {
    console.error('Gagal hapus:', err);
    showAlert('error', 'Gagal menghapus laporan.');
  }
};


  const handleDeleteDuplicates = async () => {
  try {
    const res = await axios.delete('http://localhost:5000/api/reports/duplicates/remove');
    fetchReports();
    showAlert('success', `Duplikat dihapus (${res.data.removed})`);
  } catch (err) {
    console.error('Gagal hapus duplikat:', err);
    showAlert('error', 'Gagal hapus duplikat.');
  }
};


  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
  };

  const filteredReports = reports.filter((r) =>
    (r.judul || r.title || '').toLowerCase().includes(search.toLowerCase())
  );

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>🛡️ SiPelMasD</h2>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Tutup Form' : '➕ Buat Laporan'}
        </button>
        <button onClick={handleDeleteDuplicates}>🗑️ Hapus Duplikat</button>
        <button onClick={handleLogout}>🚪 Logout</button>
      </div>

      <div className="main">
        <div className="main-header">
          <h1>Dashboard Pengguna</h1>
        </div>

        {alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div>}

        <div className="dashboard-actions">
          <input
            type="text"
            placeholder="🔍 Cari laporan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={() => setSearch('')}>Reset</button>
        </div>

        {showForm && (
          <form className="report-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Judul laporan"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              required
            />
            <textarea
              placeholder="Deskripsi laporan"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Kategori laporan"
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
            />
            <button type="submit">{editId ? 'Update' : 'Kirim'}</button>
            <button type="button" onClick={resetForm}>Reset</button>
          </form>
        )}

        <div className="report-list">
          {filteredReports.length > 0 ? (
            filteredReports.map((rpt) => (
              <div key={rpt._id} className="report-card">
                <h3>{rpt.judul || rpt.title}</h3>
                <p>{rpt.deskripsi || rpt.description}</p>
                <p><strong>Kategori:</strong> {rpt.kategori || 'Tanpa Kategori'}</p>
                <p><strong>Status:</strong> {rpt.status || 'pending'}</p>
                <div className="card-actions">
                  <button onClick={() => handleEdit(rpt)}>Edit</button>
                  <button onClick={() => handleDelete(rpt._id)}>Hapus</button>
                </div>
              </div>
            ))
          ) : (
            <p>Tidak ada laporan ditemukan.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
