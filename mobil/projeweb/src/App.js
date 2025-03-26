import React, { useState } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

function App() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      {showRegister ? (
        <RegisterPage onSwitchToLogin={() => setShowRegister(false)} />
      ) : (
        <LoginPage onSwitchToRegister={() => setShowRegister(true)} />
      )}
    </>
  );
}

export default App;
