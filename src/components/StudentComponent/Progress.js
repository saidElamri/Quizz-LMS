// Progress.js
import React from 'react';

const Progress = ({ progress }) => {
  return (
    <div style={styles.section}>
      <h2>Your Progress</h2>
      <p>Progress: {progress}%</p>
    </div>
  );
};

const styles = {
  section: {
    marginBottom: '20px',
  },
};

export default Progress;
