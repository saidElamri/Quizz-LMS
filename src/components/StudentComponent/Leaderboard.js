import React from 'react';

const Leaderboard = () => {
  // Static data for the leaderboard
  const students = [
    { name: 'Alice Johnson', score: 95 },
    { name: 'Bob Smith', score: 88 },
    { name: 'Charlie Brown', score: 82 },
    { name: 'Diana Prince', score: 99 },
    { name: 'Edward Norton', score: 76 },
    { name: 'Fiona Apple', score: 89 },
    { name: 'George Lucas', score: 90 },
  ];

  return (
    <div style={styles.leaderboardContainer}>
      <h2 style={styles.title}>Leaderboard</h2>
      <ul style={styles.list}>
        {students.length > 0 ? (
          students.map((student, index) => (
            <li key={index} style={styles.listItem}>
              <span style={styles.rank}>#{index + 1}</span>
              <span style={styles.name}>{student.name}</span>
              <span style={styles.score}>{student.score} pts</span>
            </li>
          ))
        ) : (
          <li style={styles.noData}>No data available</li>
        )}
      </ul>
    </div>
  );
};

const styles = {
  leaderboardContainer: {
    padding: '20px',
    backgroundColor: '#f4f4f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    margin: '0 auto',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 20px',
    margin: '10px 0',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease',
  },
  listItemHover: {
    transform: 'scale(1.02)',
  },
  rank: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  name: {
    flexGrow: 1,
    textAlign: 'left',
    paddingLeft: '20px',
    color: '#333',
  },
  score: {
    fontWeight: 'bold',
    color: '#28a745',
  },
  noData: {
    textAlign: 'center',
    padding: '20px',
    color: '#888',
  },
};

export default Leaderboard;
