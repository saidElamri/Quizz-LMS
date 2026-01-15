import React from 'react';

const Progress = ({ progress }) => {
  return (
    <div style={styles.progressContainer}>
      <h2 style={styles.title}>Your Progress</h2>
      <div style={styles.progressBarBackground}>
        <div style={{ ...styles.progressBar, width: `${progress}%` }}></div>
      </div>
      <p style={styles.progressText}>{progress}% Completed</p>
    </div>
  );
};

const styles = {
  progressContainer: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    margin: '0 auto',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  progressBarBackground: {
    backgroundColor: '#e0e0e0',
    borderRadius: '25px',
    height: '30px',
    width: '100%',
    overflow: 'hidden',
    marginBottom: '15px',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#28a745',
    borderRadius: '25px',
    transition: 'width 0.5s ease-in-out',
  },
  progressText: {
    fontSize: '18px',
    color: '#555',
    fontWeight: 'bold',
  },
};

export default Progress;

