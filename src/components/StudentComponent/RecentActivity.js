// RecentActivity.js
import React from 'react';

const RecentActivity = () => {
  const activities = [
    { name: 'Math Quiz', date: '2024-10-21', score: 85 },
    { name: 'History Quiz', date: '2024-10-19', score: 90 },
    { name: 'Science Quiz', date: '2024-10-18', score: 75 },
    { name: 'Geography Quiz', date: '2024-10-17', score: 88 },
    { name: 'Literature Quiz', date: '2024-10-15', score: 92 },
  ];

  return (
    <div style={styles.section}>
      <h2>Recent Quiz Activity</h2>
      <ul style={styles.activityList}>
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <li key={index} style={styles.activityItem}>
              <div style={styles.quizName}>{activity.name}</div>
              <div style={styles.quizDetails}>
                <span>{new Date(activity.date).toLocaleDateString()}</span>
                <span>Score: {activity.score}%</span>
              </div>
            </li>
          ))
        ) : (
          <li style={styles.noActivity}>No recent quiz activities</li>
        )}
      </ul>
    </div>
  );
};

const styles = {
  section: {
    marginBottom: '20px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f7f7f7',
  },
  activityList: {
    listStyleType: 'none',
    padding: 0,
  },
  activityItem: {
    padding: '10px 15px',
    marginBottom: '10px',
    borderRadius: '5px',
    backgroundColor: '#ffffff',
    display: 'flex',
    justifyContent: 'space-between',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  quizName: {
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#333',
  },
  quizDetails: {
    fontSize: '14px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    color: '#666',
  },
  noActivity: {
    fontStyle: 'italic',
    color: '#888',
  },
};

export default RecentActivity;
