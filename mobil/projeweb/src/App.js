import React, { useState, useEffect, useRef } from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import PlanTripPage from './pages/PlanTripPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import './index.css';
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const ProtectedRoute = ({ children }) => {
    if (loading) return <div className="loading">Yükleniyor...</div>;
    if (!user) return <Navigate to="/login" />;
    return children;
  };

  return (
    <Router>
      <div className="app">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/login" element={!user ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <RegisterPage onLogin={handleLogin} /> : <Navigate to="/" />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/" element={
              <ProtectedRoute>
                <HomePage user={user} />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage user={user} onLogout={handleLogout} />
              </ProtectedRoute>
            } />
            <Route path="/plan-trip" element={
              <ProtectedRoute>
                <PlanTripPage user={user} />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
