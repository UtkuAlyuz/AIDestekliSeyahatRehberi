// src/pages/ForgotPasswordPage.js
import React, { useState, useEffect, useRef } from 'react';

import '../AuthPages.css';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Şifre sıfırlama işlemi burada yapılır
    setSubmitted(true);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Şifre Sıfırla</h1>
        <p>Kayıtlı e-posta adresinizi girin. Size sıfırlama talimatları gönderelim.</p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">E-posta</label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@eposta.com"
              />
            </div>
            <button type="submit" className="auth-button">Sıfırlama Linki Gönder</button>
          </form>
        ) : (
          <p>Eğer bu e-posta kayıtlıysa, şifre sıfırlama talimatları gönderildi.</p>
        )}
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
