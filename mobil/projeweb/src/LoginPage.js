import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = ({ onSwitchToRegister }) => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Hoşgeldiniz</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Şifre" required />
          <button type="submit">Giriş Yap</button>
        </form>

        <div className="login-options">
          <span>Hesabın yok mu? <a onClick={onSwitchToRegister}>Kaydol</a></span>
          <span><a href="#">Şifremi unuttum</a></span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

