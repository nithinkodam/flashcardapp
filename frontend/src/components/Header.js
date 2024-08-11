import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';  // Import the CSS file

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
