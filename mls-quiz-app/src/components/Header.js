import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 
import logo from '../assets/logo.png.png';
import ThemeToggle from './ThemeToggle';
import { FaUser, FaSearch } from 'react-icons/fa';  // Importing the search and user icons

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearchPopup = () => setIsSearchOpen(!isSearchOpen);

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Website Logo" className="logo" />
        <span className="tagline">Empowering Learning Through Quizzes</span>
      </div>
      <nav className="nav">
        <ul>
          <li><Link to="/Home">Home</Link></li>
          <li><Link to="/quiz">Quizzes</Link></li>
          <li><Link to="/my-quizzes">My Quizzes</Link></li>
          <li><Link to="/leaderboard">Leaderboard</Link></li>
          <li><Link to="/resources">Resources</Link></li>
          <li><Link to="/about">About Us</Link></li>
        </ul>
      </nav>
      <div className="search-icon">
        <button onClick={toggleSearchPopup} className="search-button">
          <FaSearch size={20} />
        </button>
        {isSearchOpen && (
          <div className="search-popup">
            <input type="text" placeholder="Search..." />
            <button>Search</button>
          </div>
        )}
      </div>
      <div className="user-menu" onMouseEnter={() => setIsMenuOpen(true)} onMouseLeave={() => setIsMenuOpen(false)}>
        <button onClick={toggleMenu} className="user-menu-button">
          <FaUser size={20} />
        </button>
        {isMenuOpen && (
          <div className="dropdown-menu">
            <Link to="/profile">Profile</Link>
            <Link to="/settings">Settings</Link>
            <Link to="/notifications">Notifications</Link>
            <Link to="/logout">Logout</Link>
          </div>
        )}
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Header;
