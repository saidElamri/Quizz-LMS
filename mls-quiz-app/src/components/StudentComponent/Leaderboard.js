// Leaderboard.js
import React from 'react';

const Leaderboard = ({ students }) => {
  return (
    <div style={styles.section}>
      <h2>Leaderboard</h2>
      <ul>
        {students.length > 0 ? (
          students.map((student, index) => (
            <li key={index}>{student.name} - {student.score}</li>
          ))
        ) : (
          <li>No data available</li>
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

export default Leaderboard;
