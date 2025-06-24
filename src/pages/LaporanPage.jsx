import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminLaporan = () => {
  const [laporan, setLaporan] = useState([]);

  useEffect(() => {
    const fetchLaporan = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/v1/stats/reports');
        setLaporan(res.data);
      } catch (err) {
        console.error('Gagal mengambil data laporan:', err);
      }
    };

    fetchLaporan();
  }, []);

  return (
    <div className="admin-content">
      <h2>📋 Daftar Laporan</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Judul</th>
            <th>Deskripsi</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {laporan.map((item, idx) => (
            <tr key={idx}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminLaporan;
