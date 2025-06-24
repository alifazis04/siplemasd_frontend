import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const adminEmail = 'admin@sipelmasd.com';
    const adminPassword = 'admin123';
    const userEmail = 'user@sipelmasd.com';
    const userPassword = 'user123';

    if (activeTab === 'admin') {
      if (email === adminEmail && password === adminPassword) {
        localStorage.setItem('isAdmin', 'true');
        navigate('/dashboard');
      } else {
        setError('Email atau password admin salah');
      }
    } else {
      if (email === userEmail && password === userPassword) {
        localStorage.setItem('isUser', 'true');
        navigate('/user-dashboard');
      } else {
        setError('Email atau password pengguna salah');
      }
    }
  };

  return (
    <div className="login-wrapper">
      <div className="tabs">
        <button
          className={activeTab === 'admin' ? 'active' : ''}
          onClick={() => {
            setActiveTab('admin');
            setError('');
          }}
        >
          Admin
        </button>
        <button
          className={activeTab === 'user' ? 'active' : ''}
          onClick={() => {
            setActiveTab('user');
            setError('');
          }}
        >
          Pengguna
        </button>
      </div>

      <div className="login-form">
        <h2>Login {activeTab === 'admin' ? 'Admin' : 'Pengguna'}</h2>
        <form onSubmit={handleLogin}>
          {error && <p className="error">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
