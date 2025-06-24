import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './AdminDashboard.css';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const AdminDashboard = () => {
  const isAdmin = localStorage.getItem('isAdmin');

  const [summary, setSummary] = useState({
    totalReports: 0,
    totalUsers: 0,
    actedReports: 0,
  });

  const [reportList, setReportList] = useState([]);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/v1/stats/summary');
        if (res.data.success) {
          setSummary(res.data.data);
        }
      } catch (err) {
        console.error('Gagal mengambil data ringkasan:', err);
      }
    };

    const fetchReports = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/v1/stats/reports');
        setReportList(res.data.data || []);
      } catch (err) {
        console.error('Gagal mengambil data laporan:', err);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/v1/stats/users');
        setUserList(res.data.data || []);
      } catch (err) {
        console.error('Gagal mengambil data pengguna:', err);
      }
    };

    fetchSummary();
    fetchReports();
    fetchUsers();
  }, []);

  if (!isAdmin) return <Navigate to="/login" replace />;

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    window.location.href = '/login';
  };

  const chartData = [
    { name: 'Total Laporan', value: summary.totalReports },
    { name: 'Ditindaklanjuti', value: summary.actedReports },
    { name: 'Pengguna', value: summary.totalUsers },
  ];

  return (
    <div className="admin-dashboard modern">
      <aside className="sidebar">
        <h2 className="logo">🛡️ SiPelMasD</h2>
        <nav>
          <ul>
            <li><Link to="/dashboard">🏠 Dashboard</Link></li>
            <li onClick={handleLogout} style={{ cursor: 'pointer' }}>🚪 Logout</li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <h1>Dashboard Admin</h1>
          <p>👋 Halo Admin, berikut ringkasan sistem saat ini:</p>
        </header>

        <section className="cards">
          <div className="card">
            <h3>Total Laporan</h3>
            <p>{summary.totalReports}</p>
          </div>
          <div className="card">
            <h3>Pengguna Terdaftar</h3>
            <p>{summary.totalUsers}</p>
          </div>
          <div className="card">
            <h3>Laporan Ditindak</h3>
            <p>{summary.actedReports}</p>
          </div>
        </section>

        <section className="section-box">
          <h2>📊 Statistik Visual</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#03a9f4" />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <section className="section-box">
          <h2>📋 Daftar Laporan</h2>
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Judul</th>
                  <th>Deskripsi</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {reportList.length > 0 ? (
                  reportList.map((report, idx) => (
                    <tr key={idx}>
                      <td>{report.title || report.judul}</td>
                      <td>{report.description || report.deskripsi}</td>
                      <td>
                        <span className={`status ${report.status || 'pending'}`}>
                          {report.status || 'pending'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="3">Tidak ada data laporan.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="section-box">
          <h2>👥 Daftar Pengguna</h2>
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {userList.length > 0 ? (
                  userList.map((user, idx) => (
                    <tr key={idx}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role ${user.role || 'user'}`}>
                          {user.role || 'user'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="3">Tidak ada data pengguna.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
