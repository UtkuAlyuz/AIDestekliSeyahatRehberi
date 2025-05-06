// src/index.js
import React, { useState, useEffect, useRef } from 'react';

import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Eğer global stilin varsa burada

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
