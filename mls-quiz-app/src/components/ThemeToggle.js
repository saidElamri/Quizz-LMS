import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';
import './ThemeToggle.css'; // Ensure this file has the proper styling for the toggle

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button className="theme-toggle-btn" onClick={toggleTheme}>
      {theme === 'light' ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default ThemeToggle;
