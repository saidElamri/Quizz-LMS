// RecentActivity.js
import React from 'react';

const RecentActivity = ({ activities }) => {
  return (
    <div style={styles.section}>
      <h2>Recent Activity</h2>
      <ul>
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <li key={index}>{activity.name} - {activity.score}</li>
          ))
        ) : (
          <li>No recent activities</li>
        )}
      </ul>
    </div>
  );
};

const styles = {
  section: {
    marginBottom: '20px',
  },
};

export default RecentActivity;
