import React from 'react';
import './LoginPage.css'; // Aynı CSS dosyasını kullanıyoruz

const RegisterPage = ({ onSwitchToLogin }) => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Kayıt Ol</h2>
        <form>
          <input type="text" placeholder="İsim" required />
          <input type="text" placeholder="Soyisim" required />
          <input type="text" placeholder="Memleket" required />
          <input type="text" placeholder="Favori Şehir" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Şifre" required />
          <button type="submit">Hesap Oluştur</button>
        </form>

        <div className="login-options">
          <span>Zaten hesabın var mı? <a onClick={onSwitchToLogin}>Giriş Yap</a></span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
