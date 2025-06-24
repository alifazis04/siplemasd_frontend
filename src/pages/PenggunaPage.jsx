import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPengguna = () => {
  const [pengguna, setPengguna] = useState([]);

  useEffect(() => {
    const fetchPengguna = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/v1/stats/users');
        setPengguna(res.data);
      } catch (err) {
        console.error('Gagal mengambil data pengguna:', err);
      }
    };

    fetchPengguna();
  }, []);

  return (
    <div className="admin-content">
      <h2>👥 Daftar Pengguna</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {pengguna.map((user, idx) => (
            <tr key={idx}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPengguna;
