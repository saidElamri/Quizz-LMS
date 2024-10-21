import React, { useState, useEffect } from 'react';
import './Notifications.css'; // Don't forget to create this CSS file!
import Header from '../components/Header';
import Footer from '../components/Footer';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching notifications from an API
    setTimeout(() => {
      const fetchedNotifications = [
        { id: 1, message: 'New comment on your post!', time: '2 minutes ago' },
        { id: 2, message: 'You have a new follower.', time: '10 minutes ago' },
        { id: 3, message: 'Your quiz has been completed!', time: '1 hour ago' },
        { id: 4, message: 'New version of the app is available.', time: '2 hours ago' },
      ];
      setNotifications(fetchedNotifications);
      setIsLoading(false);
    }, 1000); // Simulating network delay
  }, []);

  return (
    <div>
      <Header />
    <div className="notifications-container">
        
      <h1 className="notifications-title">Notifications</h1>
      {isLoading ? (
        <p className="loading-message">Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p className="no-notifications">No new notifications</p>
      ) : (
        <ul className="notifications-list">
          {notifications.map((notification) => (
            <li key={notification.id} className="notification-item">
              <p className="notification-message">{notification.message}</p>
              <span className="notification-time">{notification.time}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
    < Footer />
    </div>

  );
}

export default Notifications;
