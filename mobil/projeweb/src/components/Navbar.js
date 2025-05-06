import React, { useState, useEffect, useRef } from 'react';

import { Link } from 'react-router-dom';
import '../Navbar.css';
import Logo from '../assets/logo.svg';


function Navbar({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={Logo} alt="TravelinGo" />
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'} />
        </div>

        <ul className={menuOpen ? 'nav-menu active' : 'nav-menu'}>
          {user ? (
            <>
              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/plan-trip" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Plan Trip
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <button onClick={onLogout} className="nav-button">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-button" onClick={() => setMenuOpen(false)}>
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;