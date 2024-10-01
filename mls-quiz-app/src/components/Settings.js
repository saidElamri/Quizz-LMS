import React, { useState } from 'react';
import './Settings.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Settings() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notifications, setNotifications] = useState(true); // Notification setting
  const [quizTimer, setQuizTimer] = useState(30); // Default quiz timer preference

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, notifications, quizTimer }),
      });

      if (response.ok) {
        alert('Settings updated successfully');
      } else {
        console.error('Failed to update settings');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="SettingsPage">
      <Header />
      <div className="settings-container">
        <h2>Account Settings</h2>

        <form onSubmit={handleSubmit} className="settings-form">
          {/* Profile Settings */}
          <div className="settings-section">
            <h3>Profile Settings</h3>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Notification Settings */}
          <div className="settings-section">
            <h3>Notification Settings</h3>
            <label>
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
              Receive email notifications
            </label>
          </div>

          {/* Quiz Preferences */}
          <div className="settings-section">
            <h3>Quiz Preferences</h3>
            <label>Default Quiz Timer (minutes):</label>
            <input
              type="number"
              value={quizTimer}
              onChange={(e) => setQuizTimer(e.target.value)}
              min="10"
              max="120"
            />
          </div>

          {/* Save button */}
          <button type="submit" className="save-button">
            Save Changes
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Settings;
