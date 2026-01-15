import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.png.png';
import ThemeToggle from './ThemeToggle';
import { FaUser, FaSearch, FaBars } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearchPopup = () => setIsSearchOpen(!isSearchOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);

  const handleHamburgerClick = (e) => {
    e.stopPropagation();
    toggleMenu();
    setIsProfileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/home">
          <img src={logo} alt="Website Logo" />
        </Link>
        <span className="tagline">Empowering Learning Through Quizzes</span>
      </div>

      <nav className="nav">
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/quiz">Quizzes</Link></li>
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
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        )}
      </div>

      <div className="user-menu">
        <button onClick={toggleProfileMenu} className="user-menu-button">
          <FaUser size={20} />
        </button>
        {isProfileMenuOpen && (
          <div className="dropdown-menu">
            <Link to="/profile">Profile</Link>
            <Link to="/settings">Settings</Link>
            <Link to="/notifications">Notifications</Link>
            <Link to="/">Logout</Link>
          </div>
        )}
      </div>

      <button className="hamburger" onClick={handleHamburgerClick}>
        <FaBars />
      </button>

      {isMenuOpen && (
        <nav className="dropdown-nav">
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/quiz">Quizzes</Link></li>
            <li><Link to="/leaderboard">Leaderboard</Link></li>
            <li><Link to="/resources">Resources</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </nav>
      )}

      <ThemeToggle />
    </header>
  );
};

export default Header;
