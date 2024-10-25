import React, { useEffect, useState } from 'react';

const RecentActivity = () => {
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Fetch from placeholder API
    const fetchRecentActivity = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        
        // Transform data to match your recentActivity structure
        const transformedData = data.map((user, index) => ({
          name: user.name,
          date: new Date(Date.now() - index * 3600 * 1000).toISOString(),
        }));

        setRecentActivity(transformedData);
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
