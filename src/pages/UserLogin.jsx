// src/pages/UserLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserLogin.css'; // Pastikan file CSS ini ada

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Login hardcoded untuk user
    const userEmail = 'user@sipelmasd.com';
    const userPassword = 'user123';

    if (email === userEmail && password === userPassword) {
  localStorage.setItem('isUser', 'true');
  localStorage.setItem('userName', 'Budi Warga'); // Tambahkan ini
  setError('');
  navigate('/user-dashboard');
    } else {
      setError('Email atau password salah');
    }
  };

  return (
    <div className="login-container">
      <h2>Login Pengguna</h2>
      <form onSubmit={handleLogin}>
        {error && <p className="error">{error}</p>}
        <input
          type="email"
          placeholder="Email pengguna"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password pengguna"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default UserLogin;
