import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ReportForm from './components/ReportForm';
import ReportList from './components/ReportList';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import LoginPage from './pages/LoginPage';
import AdminLaporan from './pages/LaporanPage';
import AdminPengguna from './pages/PenggunaPage';
import UserLogin from './pages/UserLogin';
import './App.css';

function App() {
  return (
    <Routes>
      {/* Halaman utama user */}
      <Route
        path="/"
        element={
          <div className="container">
            <ReportForm />
            <hr style={{ margin: '30px 0', borderColor: '#ddd' }} />
            <ReportList />
          </div>
        }
      />

      {/* Autentikasi & Dashboard */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/user-login" element={<UserLogin />} /> 

      {/* Routing tambahan dari sidebar admin */}
      <Route path="/laporan" element={<AdminLaporan />} />
      <Route path="/pengguna" element={<AdminPengguna />} />
    </Routes>
  );
}

export default App;
