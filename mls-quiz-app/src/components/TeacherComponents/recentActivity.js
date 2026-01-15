import React, { useEffect, useState } from 'react';

const RecentActivity = () => {
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Fetch recent activity from API
    const fetchRecentActivity = async () => {
      try {
        const data = []; // Replace with your actual API call
        setRecentActivity(data);
      } catch (error) {
        console.error('Failed to fetch recent activity:', error);
      }
    };

    fetchRecentActivity();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Recent Activity</h2>
      {recentActivity.length > 0 ? (
        <ul>
          {recentActivity.map((activity, index) => (
            <li key={index}>
              <span>{activity.name} - </span>
              <span>{new Date(activity.date).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recent activity.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    marginBottom: '20px',
  },
};

export default RecentActivity;
